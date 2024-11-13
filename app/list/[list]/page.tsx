import type {Metadata} from 'next';
import type {TTokenListItem} from '@/utils/types/types';

import List from '@/app/components/List';

export async function generateMetadata({params}: any): Promise<Metadata> {
	try {
		const list = (await fetch(
			`https://raw.githubusercontent.com/SmolDapp/tokenLists/main/lists/${params.list}.json`
		).then(async res => res.json())) as TTokenListItem;

		return {
			title: `${list.name} tokenList - SmolDapp`,
			description: list.description,
			openGraph: {
				type: 'website',
				locale: 'en-US',
				url: 'https://smold.app/tokenlistooor',
				siteName: `${list.name} tokenList - SmolDapp`,
				title: `${list.name} tokenList - SmolDapp`,
				description: list.description,
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
				site: '@smoldapp',
				card: 'summary_large_image'
			}
		};
	} catch (e) {
		return {
			title: 'Not Found',
			description: 'The page you are looking for does not exist.'
		};
	}
}

async function getList(listId: string): Promise<TTokenListItem | null> {
	try {
		const listRes = await fetch(`https://raw.githubusercontent.com/SmolDapp/tokenLists/main/lists/${listId}.json`);
		const tokenListResponse = (await listRes.json()) as TTokenListItem;
		return {
			...tokenListResponse,
			URI: `https://raw.githubusercontent.com/SmolDapp/tokenLists/main/lists/${listId}.json`
		};
	} catch (e) {
		return null;
	}
}

export default async function ListPage({params}: {params: {list: string}}): Promise<unknown> {
	const list = await getList(await params.list);

	if (!list) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		};
	}

	return <List list={list} />;
}
