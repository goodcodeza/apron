import { Button } from '@/components/ui/button';

import { columns } from './components/user-table/columns';
import { DataTable } from './components/user-table/data-table';
import { User } from './schema';

async function getData(): Promise<User[]> {
	// Fetch data from your API here.
	return [
		{
			id: crypto.randomUUID(),
			age: 22,
			firstName: 'John',
			lastName: 'Smith',
			gender: 'male'
		},
		{
			id: crypto.randomUUID(),
			age: 21,
			firstName: 'Jane',
			lastName: 'Doe',
			gender: 'female'
		}
	];
}

export default async function Users() {
	const data = await getData();

	return (
		<main className="container mx-auto px-4">
			<header className="flex justify-between items-center py-6">
				<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Users</h1>
				<Button>+ Add User</Button>
			</header>
			<DataTable columns={columns} data={data} />
		</main>
	);
}
