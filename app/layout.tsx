import React from 'react';
import {Toaster} from 'react-hot-toast';
import {Rubik, Source_Code_Pro} from 'next/font/google';

import type {ReactElement, ReactNode} from 'react';

import './style.css';

import {Providers} from '@/app/providers';

const rubik = Rubik({
	weight: ['400', '500', '600', '700'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--rubik-font'
});

const sourceCodePro = Source_Code_Pro({
	weight: ['400', '500', '600', '700'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--scp-font'
});

export const metadata = {
	title: 'Tokenlistooor - SmolDapp',
	description:
		'Up to date token lists that fulfill your needs! Tokenlistooor is a fork of Uniswap Tokenlists, with focus on adding more automation and extra features.'
};

export default function RootLayout({children}: {children: ReactNode}): ReactElement {
	return (
		<html
			lang={'en'}
			className={`${rubik.variable} ${sourceCodePro.variable}`}>
			<body>
				<Providers>
					<main className={'flex h-app flex-col'}>{children}</main>
					<Toaster position={'top-right'} />
				</Providers>
			</body>
		</html>
	);
}
