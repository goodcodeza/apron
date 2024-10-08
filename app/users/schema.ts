import { object, string, number, InferType } from 'yup';

import * as constants from './constants';
import * as messages from './messages';

export const UserSchema = object({
	gender: string()
		.transform((value: string) => (value.trim().length === 0 ? undefined : value))
		.required(messages.FORM_FIELD_REQUIRED)
		.oneOf([constants.GENDER.male, constants.GENDER.female]),
	firstName: string().required(messages.FORM_FIELD_REQUIRED),
	lastName: string().required(messages.FORM_FIELD_REQUIRED),
	age: number()
		.transform((value: number) => (isNaN(value) ? undefined : value))
		.required(messages.FORM_FIELD_REQUIRED)
		.positive()
		.integer()
		.when('gender', {
			is: constants.GENDER.male,
			then: (schema) => schema.max(constants.MAX_AGE_MALE, messages.MAX_AGE_MALE)
		})
		.when('gender', {
			is: constants.GENDER.female,
			then: (schema) => schema.max(constants.MAX_AGE_FEMALE, messages.MAX_AGE_FEMALE)
		})
});

export type User = InferType<typeof UserSchema>;
