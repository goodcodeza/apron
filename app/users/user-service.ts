import { UsersResponseSchema } from './schema';
import { User } from './types';

export const getUsers = async (): Promise<User[]> => {
	const data = await fetch(new URL('/api/users', process.env.NEXT_PUBLIC_API_BASE_URL)).then(
		(res) => res.json()
	);

	return UsersResponseSchema.validate(data);
};
