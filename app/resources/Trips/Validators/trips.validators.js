const yup = require("yup");

const createTripsSchema = yup.object().shape({
  name: yup.string().required("The name is required"),
  endDate: yup.date().notRequired(),
  description: yup.string().notRequired(),
  startDate: yup.date().required("The start date is required"),
  destination: yup.string().required("The city is required"),
});

module.exports = { createTripsSchema };
