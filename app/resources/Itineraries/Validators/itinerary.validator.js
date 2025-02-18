const yup = require("yup");

const createItinerarySchema = yup.object().shape({
  name: yup.string().notRequired(),
  tripId: yup.string().required("Trip ID is required"),
  hotspot: yup.string().notRequired(),
  description: yup.string().notRequired(),
  date: yup.date().notRequired(),
});

const getItinerariesQuery = yup.object().shape({
  tripId: yup.string().required("Trip ID is required"),
});

const updateItenerarySchema = yup.object().shape({
  name: yup.string().notRequired(),
  tripId: yup.string().notRequired(),
  hotspot: yup.string().notRequired(),
  description: yup.string().notRequired(),
  date: yup.date().notRequired(),
});
module.exports = { createItinerarySchema, getItinerariesQuery };
