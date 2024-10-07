import type { Metadata } from 'next';
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
			<body>{children}</body>
		</html>
	);
}
