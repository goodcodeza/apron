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

import { GENDER } from '@/app/users/constants';
import { type User, UserSchema } from '@/app/users/schema';

type UserFormProps = {
	user?: User;
	action: {
		submit: {
			text: string;
		};
	};
	onCancel: () => void;
};

export const UserForm = ({ user, action, onCancel }: UserFormProps) => {
	const form = useForm<User>({
		resolver: yupResolver(UserSchema),
		defaultValues: user ?? {
			firstName: '',
			lastName: '',
			gender: '',
			age: '' as unknown as number
		}
	});

	const onSubmit = (values: User) => {
		console.log(values);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="gender"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Gender</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value={GENDER.female}>
										<span className="capitalize">{GENDER.female}</span>
									</SelectItem>
									<SelectItem value={GENDER.male}>
										<span className="capitalize">{GENDER.male}</span>
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
								<Input {...field} />
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
								<Input {...field} />
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
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="grid grid-cols-4 gap-2">
					<Button variant="ghost" type="button" onClick={onCancel}>
						Cancel
					</Button>
					<Button className="col-span-3" type="submit">
						{action.submit.text}
					</Button>
				</div>
			</form>
		</Form>
	);
};
