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

import { useMessages, MessagesProvider } from '@/app/users/contexts/messages';
import * as types from '@/app/users/types';
import { UserForm } from './user-form';

type UserDialogProps = {
	user?: types.UserForm;
	mode: 'create' | 'edit';
	onSubmit: (values: types.UserForm) => Promise<void>;
	children: React.ReactNode;
};

export const UserFormDialog = ({ user, mode, onSubmit, children }: UserDialogProps) => {
	const [open, setOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const messages = useMessages();

	const handleSubmit = async (values: types.UserForm) => {
		setIsSubmitting(true);
		try {
			await onSubmit(values);
			setOpen(false);

			const message =
				mode === 'create'
					? messages['user.toast__user_created']
					: messages['user.toast__user_edited'];
			toast(message, { duration: 2000 });
		} catch (error) {
			// TODO: better error handling
			toast.error('Uh oh! Something went wrong.', { duration: 5000 });
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<MessagesProvider>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>{children}</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>
							{mode === 'create'
								? messages['user.user_form__create.title']
								: messages['user.user_form__edit.title']}
						</DialogTitle>
					</DialogHeader>
					<UserForm
						user={user}
						mode={mode}
						disabled={isSubmitting}
						onCancel={() => setOpen(false)}
						onSubmit={handleSubmit}
					/>
				</DialogContent>
			</Dialog>
		</MessagesProvider>
	);
};
