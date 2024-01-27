const { isValidObjectId } = require('mongoose');

const { HttpError } = require('../utils');

const isValidId = ({ params }, _res, next) => {
	const { contactId } = params;
	if (!isValidObjectId(contactId)) {
		next(HttpError(400, `${contactId} is not valid id`));
	}
	next();
};

module.exports = isValidId;
