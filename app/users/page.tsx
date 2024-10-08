import { Button } from '@/components/ui/button';

import { UserFormDialog } from './components/user-form/user-form-dialog';
import { columns } from './components/user-table/columns';
import { DataTable } from './components/user-table/data-table';
import * as messages from './messages';
import { getUsers } from './user-service';

export default async function Users() {
	const data = await getUsers();

	return (
		<main className="container mx-auto px-4">
			<header className="flex justify-between items-center py-6">
				<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Users</h1>
				<UserFormDialog
					title={messages.ADD_USER_FORM_TITLE}
					action={{ submit: { text: messages.FORM_ACTION_CREATE_USER } }}
				>
					<Button>+ Add User</Button>
				</UserFormDialog>
			</header>
			<DataTable columns={columns} data={data} />
		</main>
	);
}
