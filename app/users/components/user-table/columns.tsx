'use client';

import { CaretSortIcon, TrashIcon } from '@radix-ui/react-icons';
import { Column, ColumnDef } from '@tanstack/react-table';

import { deleteUser, editUser } from '@/app/users/user-service';
import { User } from '@/app/users/types';
import { Button } from '@/components/ui/button';

import { UserFormDialog } from '../user-form/user-form-dialog';
import { DeleteUserDialog } from './delete-user-dialog';

export const columns: ColumnDef<User>[] = [
	{
		accessorKey: 'gender',
		header: ({ column }) => {
			return <SortableColumnHeader column={column} text="Gender" />;
		},
		cell: ({ row }) => {
			const user = row.original;

			return <span className="capitalize">{user.gender}</span>;
		}
	},
	{
		accessorKey: 'firstName',
		header: ({ column }) => {
			return <SortableColumnHeader column={column} text="First Name" />;
		}
	},
	{
		accessorKey: 'lastName',
		header: ({ column }) => {
			return <SortableColumnHeader column={column} text="Last Name" />;
		}
	},
	{
		accessorKey: 'age',
		header: ({ column }) => {
			return <SortableColumnHeader column={column} text="Age" />;
		}
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const user = row.original;

			return (
				<div className="flex items-center space-x-2 justify-end">
					<UserFormDialog user={user} mode="edit" onSubmit={(values) => editUser(user.id, values)}>
						<Button variant="outline">Edit</Button>
					</UserFormDialog>
					<DeleteUserDialog id={user.id} onConfirm={deleteUser}>
						<Button variant="ghost" size="icon">
							<TrashIcon className="h-4 w-4" />
						</Button>
					</DeleteUserDialog>
				</div>
			);
		}
	}
];

const SortableColumnHeader = ({ column, text }: { column: Column<User>; text: string }) => {
	return (
		<div className="flex items-center space-x-2">
			<span>{text}</span>
			<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
				<CaretSortIcon className="ml-2 h-4 w-4" />
			</Button>
		</div>
	);
};
