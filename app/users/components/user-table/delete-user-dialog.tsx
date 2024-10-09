'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { useMessages } from '@/app/users/contexts/messages';

type DeleteUserDialogProps = {
	id: string;
	onConfirm: (id: string) => Promise<void>;
	children: React.ReactNode;
};

export const DeleteUserDialog = ({ id, onConfirm, children }: DeleteUserDialogProps) => {
	const [open, setOpen] = useState(false);
	const messages = useMessages();

	const handleConfirm = async () => {
		await onConfirm(id);
		setOpen(false);
		toast(messages['user.toast__user_deleted'], { duration: 2000 });
	};

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you sure you want to delete this user?</AlertDialogTitle>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<div className="grow grid grid-rows-2 grid-flow-col gap-2">
						<AlertDialogAction
							className="bg-red-500 hover:bg-red-600 text-white"
							onClick={handleConfirm}
						>
							Continue
						</AlertDialogAction>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
					</div>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
