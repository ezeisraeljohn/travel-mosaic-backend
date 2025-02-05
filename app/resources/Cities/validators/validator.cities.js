const yup = require("yup");
const { response } = require("../../../utils/helpers");
const { name } = require("ejs");

const QueryCitiesSchema = yup.object().shape({
  name: yup.string().required("The name query is required"),
});

module.exports = { QueryCitiesSchema };
