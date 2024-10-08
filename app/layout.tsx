import type { Metadata } from 'next';

import { Toaster } from '@/components/ui/toaster';
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
				<Toaster />
			</body>
		</html>
	);
}
