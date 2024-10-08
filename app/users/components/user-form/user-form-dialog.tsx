'use client';

import { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog';

import * as types from '@/app/users/types';
import { UserForm } from './user-form';

type UserDialogProps = {
	user?: types.UserForm;
	title: string;
	action: {
		submit: {
			text: string;
		};
	};
	children: React.ReactNode;
};

export const UserFormDialog = ({ user, title, action, children }: UserDialogProps) => {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				<UserForm user={user} action={action} onCancel={() => setOpen(false)} />
			</DialogContent>
		</Dialog>
	);
};
