'use client';

import { CaretSortIcon, TrashIcon } from '@radix-ui/react-icons';
import { Column, ColumnDef } from '@tanstack/react-table';

import { User } from '@/app/users/schema';
import { Button } from '@/components/ui/button';

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
			console.log(user);

			return (
				<div className="flex items-center space-x-2 justify-end">
					<Button variant="outline">Edit</Button>
					<Button variant="ghost" size="icon">
						<TrashIcon className="h-4 w-4" />
					</Button>
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
