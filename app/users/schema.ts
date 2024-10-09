import { array, object, string, number } from 'yup';

import * as constants from './constants';
import { messages } from './copy/messages';

const GenderSchema = string()
	.transform((value: string) => (value.trim().length === 0 ? undefined : value))
	.required(messages['user.any.validation__required'])
	.oneOf([constants.USER_GENDER.male, constants.USER_GENDER.female]);

const FirstNameSchema = string()
	.required(messages['user.any.validation__required'])
	.min(constants.USER_NAME_MIN_LENGTH, messages['user.first_name.validation__min_length'])
	.max(constants.USER_NAME_MAX_LENGTH, messages['user.first_name.validation__max_length']);

const LastNameSchema = string()
	.required(messages['user.any.validation__required'])
	.min(constants.USER_NAME_MIN_LENGTH, messages['user.last_name.validation__min_length'])
	.max(constants.USER_NAME_MAX_LENGTH, messages['user.last_name.validation__max_length']);

const AgeSchema = number()
	.transform((value: number) => (isNaN(value) ? undefined : value))
	.required(messages['user.any.validation__required'])
	.integer()
	.min(constants.USER_AGE_MIN, messages['user.age.validation__min'])
	.when('gender', {
		is: constants.USER_GENDER.male,
		then: (schema) =>
			schema.max(constants.USER_AGE_MAX_MALE, messages['user.age.validation__max__male'])
	})
	.when('gender', {
		is: constants.USER_GENDER.female,
		then: (schema) =>
			schema.max(constants.USER_AGE_MAX_FEMALE, messages['user.age.validation__max__female'])
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
