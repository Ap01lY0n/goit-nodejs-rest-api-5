const { Schema, model } = require('mongoose');
const Joi = require('joi');
const handleMongooseError = require('../utils/handleMongooseError');

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const contactSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Set name for contact'],
		},
		email: {
			type: String,
			match: emailRegexp,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		favorite: {
			type: Boolean,
			default: false,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'user',
		},
	},
	{ versionKey: false, timestamps: true }
);

contactSchema.post('save', handleMongooseError);

const contactAddSchema = Joi.object({
	_id: Joi.string(),
	name: Joi.string().required(),
	email: Joi.string().pattern(emailRegexp).required(),
	phone: Joi.string().required(),
	favorite: Joi.boolean(),
});

const Contact = model('contact', contactSchema);

module.exports = {
	Contact,
	contactAddSchema,
};
