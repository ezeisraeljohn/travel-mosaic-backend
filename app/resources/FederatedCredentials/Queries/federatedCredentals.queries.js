const logger = require("../../../utils/logger");
const { FederatedCredential } = require("../../../models");

const createFederatedCredentialQuery = async (userId, provider, providerId) => {
  try {
    const data = await FederatedCredential.create({
      userId,
      provider,
      providerId,
    });
    return data.toJSON();
  } catch (error) {
    logger.error(`Error creating federated credentials ${error}`, {
      stack: error.stack,
    });
    throw new Error("Error creating federated credentials");
  }
};

const getFederatedCredentialQuery = async ({ provider, providerId }) => {
  try {
    return FederatedCredential.findOne({ where: { provider, providerId } });
  } catch (error) {
    throw new Error("Error finding federated credentials");
  }
};

module.exports = {
  createFederatedCredentialQuery,
  getFederatedCredentialQuery,
};
