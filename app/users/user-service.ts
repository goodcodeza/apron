'use server';

import { revalidateTag } from 'next/cache';
import { UsersResponseSchema } from './schema';
import { User, UserForm } from './types';

const CACHE_TAG_GET_USERS = 'GET_USERS';

export const getUsers = async (): Promise<User[]> => {
	const data = await fetch(new URL('/api/users', process.env.NEXT_PUBLIC_API_BASE_URL), {
		next: { tags: [CACHE_TAG_GET_USERS] }
	}).then((res) => res.json());

	return UsersResponseSchema.validate(data);
};

export const createUser = async (values: UserForm): Promise<void> => {
	await fetch(new URL(`/api/users`, process.env.NEXT_PUBLIC_API_BASE_URL), {
		method: 'POST',
		body: JSON.stringify(values),
		headers: { 'Content-Type': 'application/json' }
	});

	revalidateTag(CACHE_TAG_GET_USERS);
};

export const editUser = async (id: string, values: UserForm): Promise<void> => {
	await fetch(new URL(`/api/users/${id}`, process.env.NEXT_PUBLIC_API_BASE_URL), {
		method: 'PATCH',
		body: JSON.stringify(values),
		headers: { 'Content-Type': 'application/json' }
	});

	revalidateTag(CACHE_TAG_GET_USERS);
};
