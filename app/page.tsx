import type {Metadata} from 'next';
import type {ReactElement} from 'react';

import Lists from '@/app/components/Lists';

export const metadata: Metadata = {
	title: 'Tokenlistooor - SmolDapp',
	description:
		'Up to date token lists that fulfill your needs! Tokenlistooor is a fork of Uniswap Tokenlists, with focus on adding more automation and extra features.',
	openGraph: {
		type: 'website',
		locale: 'en-US',
		url: 'https://smold.app/tokenlistooor',
		siteName: 'Tokenlistooor - SmolDapp',
		title: 'Tokenlistooor - SmolDapp',
		description:
			'Up to date token lists that fulfill your needs! Tokenlistooor is a fork of Uniswap Tokenlists, with focus on adding more automation and extra features.',
		images: [
			{
				url: 'https://smold.app/og_tokenlistooor.png',
				width: 800,
				height: 400,
				alt: 'tokenListooor'
			}
		]
	},
	twitter: {
		creator: '@smoldapp',
		card: 'summary_large_image',
		title: 'Tokenlists - MOM'
	}
};

export default function Home(): ReactElement {
	return <Lists />;
}
