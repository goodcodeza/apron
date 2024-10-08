'use client';

import { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

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
	const { toast } = useToast();

	const handleSubmit = async (values: types.UserForm) => {
		setIsSubmitting(true);
		try {
			await onSubmit(values);
			setOpen(false);
			toast({
				description: action.submit.onSuccess
			});
		} catch (error) {
			// TODO: better error handling
			toast({
				variant: 'destructive',
				title: 'Uh oh! Something went wrong.',
				description: 'There was a problem with your request.'
			});
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
