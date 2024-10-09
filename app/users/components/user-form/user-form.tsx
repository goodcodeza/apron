'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';

import { USER_GENDER } from '@/app/users/constants';
import { useMessages } from '@/app/users/contexts/messages';
import { UserFormSchema } from '@/app/users/schema';
import * as types from '@/app/users/types';
import * as testids from '@/e2e/test-ids';

type UserFormProps = {
	user?: types.UserForm;
	mode: 'create' | 'edit';
	disabled: boolean;
	onCancel: () => void;
	onSubmit: (values: types.UserForm) => void;
};

export const UserForm = ({ user, mode, disabled, onCancel, onSubmit }: UserFormProps) => {
	const form = useForm<types.UserForm>({
		resolver: yupResolver(UserFormSchema),
		defaultValues: user ?? {
			firstName: '',
			lastName: '',
			gender: '',
			age: '' as unknown as number
		}
	});
	const messages = useMessages();

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
				<FormField
					control={form.control}
					name="gender"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Gender</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger data-testid={testids.USER_FORM_FORM_CONTROL_GENDER}>
										<SelectValue />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem
										value={USER_GENDER.female}
										data-testid={testids.USER_FORM_FORM_CONTROL_GENDER_OPTION_FEMALE}
									>
										<span className="capitalize">{USER_GENDER.female}</span>
									</SelectItem>
									<SelectItem
										value={USER_GENDER.male}
										data-testid={testids.USER_FORM_FORM_CONTROL_GENDER_OPTION_MALE}
									>
										<span className="capitalize">{USER_GENDER.male}</span>
									</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="firstName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>First Name</FormLabel>
							<FormControl>
								<Input {...field} data-testid={testids.USER_FORM_FORM_CONTROL_FIRST_NAME} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="lastName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Last Name</FormLabel>
							<FormControl>
								<Input {...field} data-testid={testids.USER_FORM_FORM_CONTROL_LAST_NAME} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="age"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Age</FormLabel>
							<FormControl>
								<Input {...field} data-testid={testids.USER_FORM_FORM_CONTROL_AGE} />
							</FormControl>
							<FormMessage data-testid={testids.USER_FORM_FORM_CONTROL_AGE_ERROR} />
						</FormItem>
					)}
				/>
				<div className="grid grid-cols-4 gap-2">
					<Button variant="ghost" type="button" onClick={onCancel}>
						Cancel
					</Button>
					<Button
						className="col-span-3"
						type="submit"
						disabled={disabled || form.formState.isSubmitting}
						data-testid={testids.USER_FORM_ACTION_SUBMIT}
					>
						{mode === 'create'
							? messages['user.user_form__create.action.submit']
							: messages['user.user_form__edit.action.submit']}
					</Button>
				</div>
			</form>
		</Form>
	);
};
