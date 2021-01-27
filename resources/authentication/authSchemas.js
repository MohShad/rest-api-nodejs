const Joi = require('joi')

const schemas = {
	createUserRequest: Joi.object().keys({
		name: Joi.string()
			.required()
			.error(() => {
				return {
					message: 'The name attribute is required.',
				};
			}),
		email: Joi.string()
			.email()
			.required()
			.error(() => {
				return {
					message: 'The email attribute is mandatory and must be a valid email.',
				};
			}),
		password: Joi.string()
			.required()
			.error(() => {
				return {
					message: 'The password attribute is mandatory.',
				};
			}),
		cell_phone: Joi.string()
			.regex(/^[0-9]{10,11}$/)
			.error(() => {
				return {
					message: 'The cell_phone attribute must be a phone with 10 or 11 numbers (including DDD).',
				};
			}),
	}),
	loginRequest: Joi.object().keys({
		email: Joi.string()
			.email()
			.required()
			.error(() => {
				return {
					message: 'The email attribute is mandatory and must be a valid email.',
				};
			}),
		password: Joi.string()
			.required()
			.error(() => {
				return {
					message: 'The password attribute is mandatory.',
				};
			})
	})
};

module.exports = schemas;