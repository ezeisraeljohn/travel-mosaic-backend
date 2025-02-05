const yup = require("yup");

const getHotspotsSchema = yup.object().shape({
  cityId: yup.string().required("City is required"),
  categoryId: yup.string().notRequired(),
});

module.exports = { getHotspotsSchema };
