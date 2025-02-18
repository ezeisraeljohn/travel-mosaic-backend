const dotenv = require("dotenv");
const { TokenExpiredError } = require("jsonwebtoken");
const passport = require("passport");
const BearerStrategy = require("passport-http-bearer");
const LocalStrategy = require("passport-local");
const GoogleStrategy = require("passport-google-oauth20");
const { User } = require("../models");
const { verifyPassword } = require("../utils/helpers");
const jwt = require("jsonwebtoken");
const {
  getUserByEmailQuery,
} = require("../resources/Users/Queries/users.query");
const logger = require("../utils/logger");
const {
  createUserQuery,
} = require("../resources/Authentication/Queries/authentication.query");
const {
  createFederatedCredentialQuery,
  getFederatedCredentialQuery,
} = require("../resources/FederatedCredentials/Queries/federatedCredentals.queries");
dotenv.config();

/**
 * Passport configuration
 * Local authentication strategy
 */
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await getUserByEmailQuery(email);
        if (!user) {
          logger.warn(`User not found.`);
          return done(null, false);
        }
        const isValid = verifyPassword(password, user.password);
        if (!isValid) {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        logger.error(`Error finding user ${error}`, {
          stack: error.stack,
        });
        return done(error);
      }
    }
  )
);

/**
 * Bearer authentication strategy
 * Used for authenticating users using JWT
 */
passport.use(
  new BearerStrategy(async (token, done) => {
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      const user = await User.findByPk(decoded.id);
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      logger.error(`Error finding user ${error}`, {
        stack: error.stack,
      });
      return done(error);
    }
  })
);

/**
 * Google authentication strategy
 */
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        let user = await getUserByEmailQuery(email);
        if (!user) {
          const info = {
            email,
            password: null,
            firstname: profile.name.givenName,
            lastname: profile.name.familyName,
            profilePicture: profile.photos[0].value,
            isEmailVerified: profile.emails[0].verified,
          };
          user = await createUserQuery(info);
        }
        let credentials = await getFederatedCredentialQuery({
          userId: user.id,
          provider: process.env.GOOGLE_CREDENTIAL_PROVIDER,
          providerId: profile.id,
        });
        if (!credentials) {
          credentials = await createFederatedCredentialQuery(
            user.id,
            process.env.GOOGLE_CREDENTIAL_PROVIDER,
            profile.id
          );
        }
        return done(null, user);
      } catch (error) {
        logger.error(`Error finding user ${error}`, {
          stack: error.stack,
        });
        return done(error);
      }
    }
  )
);
module.exports = passport;
