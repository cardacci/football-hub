/* ===== Imports ===== */
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

/* ===== Constants & Enums ===== */
const geistMono = Geist_Mono({
	subsets: ['latin'],
	variable: '--font-geist-mono',
});

const geistSans = Geist({
	subsets: ['latin'],
	variable: '--font-geist-sans',
});

/* ===== Types & Interfaces ===== */
interface RootLayoutProps {
	children: React.ReactNode;
}

export const metadata: Metadata = {
	description: 'Explore leagues, standings, fixtures, and modern web development techniques.',
	title: 'Football Hub ⚽',
};

/* ===== Component Function ===== */
export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				{children}
			</body>
		</html>
	);
}
