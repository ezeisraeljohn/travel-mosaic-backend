const { FederatedCredential } = require("../../../models");

const createFederatedCredentialQuery = async (provider, providerId) => {
  try {
    const data = await FederatedCredential.create({ provider, providerId });
    return data.toJSON();
  } catch (error) {
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
