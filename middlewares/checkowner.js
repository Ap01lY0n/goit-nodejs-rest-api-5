const { Contact } = require('../models');
const { HttpError } = require('../utils');

const checkOwner = ({ params, user }, _res, next) => {
	const { contactId } = params;
	const contact = Contact.findOne({ contactId });
	if (user._id !== contact.owner) {
		next(HttpError(404));
	}
	next();
};

module.exports = checkOwner;
