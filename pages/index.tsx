import React, {Fragment, useMemo, useState} from 'react';
import {useRouter} from 'next/router';
import {DefaultSeo} from 'next-seo';
import LEGACY_TOKEN_LISTS from 'utils/legacyTokenLists';
import * as chains from 'wagmi/chains';
import axios from 'axios';
import useSWR from 'swr';
import {motion} from 'framer-motion';
import TokenListCard, {LegacyTokenListCard} from '@tokenlistooor/TokenListCard';
import TokenListHero from '@tokenlistooor/TokenListHero';

import type {Variants} from 'framer-motion';
import type {ReactElement} from 'react';
import type {TNDict} from '@builtbymom/web3/types';
import type {TTokenListItem, TTokenListSummary} from '@utils/types/types';

const fetcher = async (url: string): Promise<any> => axios.get(url).then(res => res.data);

const variants = {
	enter: (i: number): unknown => ({
		y: 0,
		opacity: 1,
		transition: {
			delay: i * 0.04,
			duration: 0.5,
			ease: 'linear'
		}
	}),
	initial: {y: 60, opacity: 0}
};

export function Filters({
	allSupportedChains,
	network,
	set_search,
	set_network
}: {
	allSupportedChains: chains.Chain[];
	network: number;
	set_search: (value: string) => void;
	set_network: (value: number) => void;
}): ReactElement {
	const router = useRouter();

	return (
		<div className={'flex items-center space-x-4 py-4 md:pt-0'}>
			<div>
				<input
					className={
						'text-neutral-500 rounded-md border border-neutral-200 bg-neutral-0 px-3 py-1 text-xs leading-6 md:text-sm'
					}
					type={'text'}
					placeholder={'Search'}
					onChange={(e): void => {
						set_search(e.target.value || '');
						if (!e.target.value) {
							const {search, ...queryNoSearch} = router.query;
							search;
							router.push({query: queryNoSearch});
						} else {
							router.push({
								query: {
									...router.query,
									search: e.target.value
								}
							});
						}
					}}
				/>
			</div>
			<div>
				<select
					className={
						'text-neutral-500 rounded-md border border-neutral-200 bg-neutral-0 px-3 py-1 pr-10 text-xs leading-6 md:text-sm'
					}
					value={network}
					onChange={(e): void => {
						set_network(Number(e.target.value));
						if (Number(e.target.value) === -1) {
							const {network, ...queryNoNetwork} = router.query;
							network;
							router.push({query: queryNoNetwork});
						} else {
							router.push({
								query: {
									...router.query,
									network: e.target.value
								}
							});
						}
					}}>
					<option value={-1}>{'All Networks'}</option>
					{allSupportedChains.map(
						(network): ReactElement => (
							<option
								key={network.id}
								value={network.id}>
								{network.name}
							</option>
						)
					)}
				</select>
			</div>
		</div>
	);
}

function Lists(): ReactElement {
	const [typeOfList, set_typeOfList] = useState<'tokens' | 'pools' | 'chains' | 'statics' | 'legacy'>('chains');
	const [search, set_search] = useState('');
	const [currentNetwork, set_currentNetwork] = useState(-1);
	const {data: summary} = useSWR<TTokenListSummary>(
		'https://raw.githubusercontent.com/smoldapp/tokenLists/main/lists/summary.json',
		fetcher
	);

	const allLists = useMemo(() => summary?.lists || ([] as TTokenListItem[]), [summary]);

	const {tokens, pools, networks, statics} = useMemo((): {
		tokens: TTokenListItem[];
		pools: TTokenListItem[];
		networks: TTokenListItem[];
		statics: TTokenListItem[];
	} => {
		const tokens: TTokenListItem[] = [];
		const pools: TTokenListItem[] = [];
		const networks: TTokenListItem[] = [];
		const statics: TTokenListItem[] = [];
		allLists.forEach((list: TTokenListItem): void => {
			if (list.description.toLowerCase().includes('the most popular tokens on')) {
				if (list.tokenCount === 0) {
					return;
				}
				networks.push(list);
			} else if (list.name.toLowerCase().includes('token pool')) {
				pools.push(list);
			} else if (list.name.toLowerCase().includes('(static)')) {
				statics.push(list);
			} else {
				tokens.push(list);
			}
		});
		return {tokens, pools, networks, statics};
	}, [allLists]);

	const listToRender = useMemo((): TTokenListItem[] | undefined => {
		let list = undefined;
		if (typeOfList === 'chains') {
			list = networks;
		} else if (typeOfList === 'tokens') {
			list = tokens;
		} else if (typeOfList === 'pools') {
			list = pools;
		} else if (typeOfList === 'statics') {
			list = statics;
		}
		if (!list) {
			return undefined;
		}
		//Filter by chainID
		list = list.filter((item): boolean => {
			if (currentNetwork !== -1) {
				return item.metadata.supportedChains.includes(currentNetwork);
			}
			return true;
		});

		//Filter by search
		list = list.filter((item): boolean => {
			if (search) {
				return item.name.toLowerCase().includes(search.toLowerCase());
			}
			return true;
		});
		return list;
	}, [typeOfList, networks, tokens, pools, currentNetwork, statics, search]);

	const allSupportedChains = useMemo((): chains.Chain[] => {
		const supportedChains: chains.Chain[] = [];
		const exists: TNDict<boolean> = {};
		allLists.forEach((item): void => {
			const chainsForList = item.metadata.supportedChains;
			chainsForList.forEach((chainId): void => {
				if (exists[chainId]) {
					return;
				}
				exists[chainId] = true;
				const matchingChain = Object.values(chains).find((chain): boolean => chain.id === chainId);
				if (matchingChain) {
					supportedChains.push(matchingChain);
				}
			});
		});
		return supportedChains;
	}, [allLists]);

	return (
		<Fragment>
			<TokenListHero summary={summary} />
			<div className={'mx-auto mb-10 grid w-full max-w-5xl'}>
				<div className={'box-0 w-full p-4 md:p-6'}>
					<h2 className={'pb-2 text-lg font-medium'}>
						{'NEW! Automated Chain Lists: Always Fresh, Always Reliable!'}
					</h2>
					<div className={'text-sm leading-relaxed text-neutral-700'}>
						<p>
							{
								'Every Sunday, Tokenlistooor performs a comprehensive update to ensure our token lists are up-to-date.'
							}
						</p>
						<p>
							{
								'We check and update thousands of tokens from various sources, ensuring the data reflects the latest information.'
							}
						</p>
						<p>
							{'Tokens that appear in '}
							<b>{'at least 50% of all sources'}</b>
							{' are selected to create our Chain Lists.'}
						</p>
					</div>
				</div>
			</div>

			<div className={'mx-auto mt-2 flex w-full max-w-5xl grid-cols-2 flex-col-reverse md:grid'}>
				<Filters
					allSupportedChains={allSupportedChains}
					network={currentNetwork}
					set_network={set_currentNetwork}
					set_search={set_search}
				/>
				<menu className={'flex flex-row items-center text-xs md:mb-4 md:justify-end'}>
					<button
						onClick={(): void => set_typeOfList('chains')}
						className={`transition-colors ${
							typeOfList === 'chains'
								? 'text-neutral-900'
								: 'cursor-pointer text-neutral-900/60 hover:text-neutral-700'
						}`}>
						{'Chains'}
					</button>
					&nbsp;<p className={'text-neutral-900/60'}>{'/'}</p>&nbsp;
					<button
						onClick={(): void => set_typeOfList('tokens')}
						className={`transition-colors ${
							typeOfList === 'tokens'
								? 'text-neutral-900'
								: 'cursor-pointer text-neutral-900/60 hover:text-neutral-700'
						}`}>
						{'Protocols'}
					</button>
					&nbsp;<p className={'text-neutral-900/60'}>{'/'}</p>&nbsp;
					<button
						onClick={(): void => set_typeOfList('statics')}
						className={`transition-colors ${
							typeOfList === 'statics'
								? 'text-neutral-900'
								: 'cursor-pointer text-neutral-900/60 hover:text-neutral-700'
						}`}>
						{'Statics'}
					</button>
					&nbsp;<p className={'text-neutral-900/60'}>{'/'}</p>&nbsp;
					<button
						onClick={(): void => set_typeOfList('pools')}
						className={`transition-colors ${
							typeOfList === 'pools'
								? 'text-neutral-900'
								: 'cursor-pointer text-neutral-900/60 hover:text-neutral-700'
						}`}>
						{'Pools'}
					</button>
					&nbsp;<p className={'text-neutral-900/60'}>{'/'}</p>&nbsp;
					<button
						onClick={(): void => set_typeOfList('legacy')}
						className={`transition-colors ${
							typeOfList === 'legacy'
								? 'text-neutral-900'
								: 'cursor-pointer text-neutral-900/60 hover:text-neutral-700'
						}`}>
						{'Legacy'}
					</button>
				</menu>
			</div>

			<div className={'mx-auto grid w-full max-w-5xl'}>
				<div
					id={'tokenlistooor'}
					className={'grid grid-cols-1 gap-6 pb-32 md:grid-cols-3'}>
					{typeOfList === 'legacy'
						? LEGACY_TOKEN_LISTS.map(
								(tokenListItem, i): ReactElement => (
									<motion.div
										key={tokenListItem.name}
										custom={i}
										initial={'initial'}
										whileInView={'enter'}
										variants={variants as Variants}
										className={'box-0 relative flex w-full pt-4 md:pt-6'}>
										<LegacyTokenListCard item={tokenListItem} />
									</motion.div>
								)
							)
						: (listToRender || []).map(
								(tokenListItem: TTokenListItem, i: number): ReactElement => (
									<motion.div
										key={tokenListItem.name}
										custom={i}
										initial={'initial'}
										whileInView={'enter'}
										variants={variants as Variants}
										className={'box-0 relative flex w-full pt-4 md:pt-6'}>
										<TokenListCard
											network={currentNetwork}
											item={tokenListItem}
										/>
									</motion.div>
								)
							)}
				</div>
			</div>
		</Fragment>
	);
}

function Home(): ReactElement {
	return <Lists />;
}

export default function Wrapper(): ReactElement {
	return (
		<>
			<DefaultSeo
				title={'Tokenlistooor - SmolDapp'}
				defaultTitle={'Tokenlistooor - SmolDapp'}
				description={
					'Up to date token lists that fulfill your needs! Tokenlistooor is a fork of Uniswap Tokenlists, with focus on adding more automation and extra features.'
				}
				openGraph={{
					type: 'website',
					locale: 'en-US',
					url: 'https://smold.app/tokenlistooor',
					site_name: 'Tokenlistooor - SmolDapp',
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
				}}
				twitter={{
					handle: '@smoldapp',
					site: '@smoldapp',
					cardType: 'summary_large_image'
				}}
			/>
			<Home />
		</>
	);
}
