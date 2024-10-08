import { array, object, string, number } from 'yup';

import * as constants from './constants';
import * as messages from './messages';

const GenderSchema = string()
	.transform((value: string) => (value.trim().length === 0 ? undefined : value))
	.required(messages.FORM_FIELD_REQUIRED)
	.oneOf([constants.GENDER.male, constants.GENDER.female]);

const FirstNameSchema = string()
	.required(messages.FORM_FIELD_REQUIRED)
	.min(constants.NAME_MIN_LENGTH)
	.max(constants.NAME_MAX_LENGTH);

const LastNameSchema = string()
	.required(messages.FORM_FIELD_REQUIRED)
	.min(constants.NAME_MIN_LENGTH)
	.max(constants.NAME_MAX_LENGTH);

const AgeSchema = number()
	.transform((value: number) => (isNaN(value) ? undefined : value))
	.required(messages.FORM_FIELD_REQUIRED)
	.positive()
	.integer()
	.min(constants.MIN_AGE)
	.when('gender', {
		is: constants.GENDER.male,
		then: (schema) => schema.max(constants.MAX_AGE_MALE, messages.MAX_AGE_MALE)
	})
	.when('gender', {
		is: constants.GENDER.female,
		then: (schema) => schema.max(constants.MAX_AGE_FEMALE, messages.MAX_AGE_FEMALE)
	});

export const UserFormSchema = object({
	gender: GenderSchema,
	firstName: FirstNameSchema,
	lastName: LastNameSchema,
	age: AgeSchema
});

export const UserSchema = object({
	id: string().required(),
	gender: GenderSchema,
	firstName: FirstNameSchema,
	lastName: LastNameSchema,
	age: AgeSchema
});

export const UsersResponseSchema = array(UserSchema);
