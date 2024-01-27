const { HttpError } = require('../utils');

const validateBody = (schema, message) => {
	const func = (req, res, next) => {
	  if (['POST', 'PUT'].includes(req.method)) {
		const { error } = schema.validate(req.body);
		if (error) {
		  return next(HttpError(400, message || error.message));
		}
	  }
	  next();
	};
  
	return func;
  };
  
  module.exports = validateBody;