const returnResult = (type, data = null) => ({ type, data });

const response = (data) => (title) => (res) => {
  const {
    status = 400,
    success = false,
    message = "An unknown error occurred",
    entity = null,
  } = data || {};

  return res.status(status).json({
    success,
    title,
    message,
    data: entity,
  });
};

const returnFromService =
  (status) => (success) => (title) => (message) => (entity) => {
    return { status, success, title, message, entity };
  };

module.exports = {
  returnFromService,
  returnResult,
  response,
};
