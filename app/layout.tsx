import type { Metadata } from 'next';

import { Toaster } from 'sonner';
import * as testids from '@/e2e/test-ids';
import './globals.css';

export const metadata: Metadata = {
	title: 'Apron',
	description: 'Senior Web Software Engineer - Home Task'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				{children}
				<Toaster
					position="top-center"
					toastOptions={{
						unstyled: true,
						classNames: {
							toast:
								'rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground shadow h-9 px-4 py-2'
						}
					}}
					data-testid={testids.GLOBAL_NOTIFICATION}
				/>
			</body>
		</html>
	);
}
