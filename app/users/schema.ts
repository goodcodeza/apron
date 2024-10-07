import { object, string, number, InferType } from 'yup';

import * as constants from './constants';
import * as messages from './messages';

export const UserSchema = object({
	id: string().required(),
	gender: string().required().oneOf([constants.GENDER.male, constants.GENDER.female]),
	firstName: string().required(),
	lastName: string().required(),
	age: number()
		.required()
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
