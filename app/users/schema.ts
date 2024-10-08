import { array, object, string, number } from 'yup';

import * as constants from './constants';
import * as messages from './messages';

const GenderSchema = string()
	.transform((value: string) => (value.trim().length === 0 ? undefined : value))
	.required(messages.FORM_CONTROL_REQUIRED)
	.oneOf([constants.USER_GENDER.male, constants.USER_GENDER.female]);

const FirstNameSchema = string()
	.required(messages.FORM_CONTROL_REQUIRED)
	.min(constants.USER_NAME_MIN_LENGTH, messages.FORM_CONTROL_FIRST_NAME_MIN_LENGTH)
	.max(constants.USER_NAME_MAX_LENGTH, messages.FORM_CONTROL_FIRST_NAME_MAX_LENGTH);

const LastNameSchema = string()
	.required(messages.FORM_CONTROL_REQUIRED)
	.min(constants.USER_NAME_MIN_LENGTH, messages.FORM_CONTROL_LAST_NAME_MIN_LENGTH)
	.max(constants.USER_NAME_MAX_LENGTH, messages.FORM_CONTROL_LAST_NAME_MAX_LENGTH);

const AgeSchema = number()
	.transform((value: number) => (isNaN(value) ? undefined : value))
	.required(messages.FORM_CONTROL_REQUIRED)
	.integer()
	.min(constants.USER_AGE_MIN, messages.FORM_CONTROL_AGE_MIN)
	.when('gender', {
		is: constants.USER_GENDER.male,
		then: (schema) => schema.max(constants.USER_AGE_MAX_MALE, messages.FORM_CONTROL_AGE_MAX_MALE)
	})
	.when('gender', {
		is: constants.USER_GENDER.female,
		then: (schema) =>
			schema.max(constants.USER_AGE_MAX_FEMALE, messages.FORM_CONTROL_AGE_MAX_FEMALE)
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
