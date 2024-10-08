import type { Metadata } from 'next';

import { Toaster } from '@/components/ui/toaster';
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
				<Toaster data-testid={testids.GLOBAL_NOTIFICATION} />
			</body>
		</html>
	);
}
