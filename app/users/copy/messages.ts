import * as constants from '@/app/users/constants';

export const messages = {
	// Micro Copy
	'user.user_form__create.title': 'Add user',
	'user.user_form__create.action.submit': 'Add', // The design says that this could be 'Save' in certain cases - will need to clarify with product.
	'user.user_form__edit.title': 'Edit user',
	'user.user_form__edit.action.submit': 'Save',
	'user.toast__user_created': 'User added',
	'user.toast__user_edited': 'User edited',
	'user.toast__user_deleted': 'User deleted',

	// Schema Validation Messages
	'user.any.validation__required': 'Required',
	'user.first_name.validation__min_length': `The length of the first name cannot be less than ${constants.USER_NAME_MIN_LENGTH} characters`,
	'user.first_name.validation__max_length': `The length of the first name cannot exceed ${constants.USER_NAME_MAX_LENGTH} characters`,
	'user.last_name.validation__min_length': `The length of the last name cannot be less than ${constants.USER_NAME_MIN_LENGTH} characters`,
	'user.last_name.validation__max_length': `The length of the last name cannot exceed ${constants.USER_NAME_MAX_LENGTH} characters`,
	'user.age.validation__min': `The minimum age for a user is ${constants.USER_AGE_MIN}`,
	'user.age.validation__max__male': `The maximum age for male users is ${constants.USER_AGE_MAX_MALE}`,
	'user.age.validation__max__female': `The maximum age for female users is ${constants.USER_AGE_MAX_FEMALE}`
} as const;
