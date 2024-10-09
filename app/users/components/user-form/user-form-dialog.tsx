'use client';

import { useState } from 'react';
import { toast } from 'sonner';
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
			onSuccess: string;
		};
	};
	onSubmit: (values: types.UserForm) => Promise<void>;
	children: React.ReactNode;
};

export const UserFormDialog = ({ user, title, action, onSubmit, children }: UserDialogProps) => {
	const [open, setOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (values: types.UserForm) => {
		setIsSubmitting(true);
		try {
			await onSubmit(values);
			setOpen(false);
			toast(action.submit.onSuccess, { duration: 2000 });
		} catch (error) {
			// TODO: better error handling
			toast.error('Uh oh! Something went wrong.', { duration: 5000 });
			console.error(error);
			setIsSubmitting(false); // allow the user to retry
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				<UserForm
					user={user}
					action={action}
					disabled={isSubmitting}
					onCancel={() => setOpen(false)}
					onSubmit={handleSubmit}
				/>
			</DialogContent>
		</Dialog>
	);
};
