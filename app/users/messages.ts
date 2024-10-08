import * as constants from './constants';

export const ADD_USER_FORM_TITLE = 'Add user';
export const EDIT_USER_FORM_TITLE = 'Edit user';
export const FORM_ACTION_SAVE_USER = 'Save';
export const SAVE_USER_SUCCESS_TOAST = 'User edited';
export const FORM_ACTION_CREATE_USER = 'Add';
export const CREATE_USER_SUCCESS_TOAST = 'User added';
export const DELETE_USER_SUCCESS_TOAST = 'User deleted';

export const FORM_CONTROL_REQUIRED = 'Required';
export const FORM_CONTROL_FIRST_NAME_MIN_LENGTH = `The length of the first name cannot be less than ${constants.USER_NAME_MIN_LENGTH} characters`;
export const FORM_CONTROL_FIRST_NAME_MAX_LENGTH = `The length of the first name cannot exceed ${constants.USER_NAME_MAX_LENGTH} characters`;
export const FORM_CONTROL_LAST_NAME_MIN_LENGTH = `The length of the last name cannot be less than ${constants.USER_NAME_MIN_LENGTH} characters`;
export const FORM_CONTROL_LAST_NAME_MAX_LENGTH = `The length of the last name cannot exceed ${constants.USER_NAME_MAX_LENGTH} characters`;
export const FORM_CONTROL_AGE_MIN = `The minimum age for a user is ${constants.USER_AGE_MIN}`;
export const FORM_CONTROL_AGE_MAX_MALE = `The maximum age for male users is ${constants.USER_AGE_MAX_MALE}`;
export const FORM_CONTROL_AGE_MAX_FEMALE = `The maximum age for female users is ${constants.USER_AGE_MAX_FEMALE}`;
