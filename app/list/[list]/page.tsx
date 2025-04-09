import type {Metadata} from 'next';
import type {TTokenListItem} from '@/utils/types/types';

import List from '@/app/components/List';

export async function generateMetadata(props: any): Promise<Metadata> {
	const params = await props.params;
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

export default async function ListPage(props: {params: Promise<{list: string}>}): Promise<unknown> {
	const params = await props.params;
	let listName = await params.list;
	if (listName === 'smolassets') {
		listName = 'smolAssets';
	}
	if (listName === 'tokenregistry') {
		listName = 'tokenRegistry';
	}
	const list = await getList(listName);

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
