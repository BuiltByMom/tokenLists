import React from 'react';
import {Rubik, Source_Code_Pro} from 'next/font/google';
import {WithMom} from '@builtbymom/web3/contexts/WithMom';
import {WithTokenList} from '@builtbymom/web3/contexts/WithTokenList';
import {localhost} from '@builtbymom/web3/utils/wagmi';
import {supportedNetworks, supportedTestNetworks} from '@utils/tools.chains';
import {Analytics} from '@vercel/analytics/react';
import Meta from '@common/Meta';

import type {AppProps} from 'next/app';
import type {ReactElement} from 'react';

import '../style.css';

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

function MyApp(props: AppProps): ReactElement {
	const {Component} = props;

	return (
		<>
			<style
				jsx
				global>
				{`
					html {
						font-family: ${rubik.style.fontFamily}, ${sourceCodePro.style.fontFamily};
					}
				`}
			</style>
			<WithMom supportedChains={[...supportedNetworks, ...supportedTestNetworks, localhost]}>
				<WithTokenList>
					<main className={`flex h-app flex-col ${rubik.variable} ${sourceCodePro.variable}`}>
						<Meta />
						<Component {...props} />
					</main>
				</WithTokenList>
			</WithMom>
			<Analytics />
		</>
	);
}

export default MyApp;
