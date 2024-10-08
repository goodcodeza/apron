import { InferType } from 'yup';

import { UserFormSchema, UserSchema } from './schema';

export type UserForm = InferType<typeof UserFormSchema>;

export type User = InferType<typeof UserSchema>;
