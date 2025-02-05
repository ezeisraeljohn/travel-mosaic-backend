const { HotspotCategory } = require("../../../models");
const { Hotspot } = require("../../../models");

const getCategoryByIdQuery = async (categoryId) => {
  try {
    return HotspotCategory.findOne({
      where: {
        id: categoryId,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { getCategoryByIdQuery };
