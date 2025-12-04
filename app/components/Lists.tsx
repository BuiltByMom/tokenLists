'use client';

import {Fragment, useMemo, useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import * as chains from 'wagmi/chains';
import axios from 'axios';
import useSWR from 'swr';
import {motion} from 'framer-motion';

import TokenListCard, {LegacyTokenListCard} from './TokenListCard';
import {ViewToggle} from './ViewToggle';

import type {Variants} from 'framer-motion';
import type {ReactElement} from 'react';
import type {TNDict} from '@builtbymom/web3/types';
import type {TTokenListItem, TTokenListSummary} from '@/utils/types/types';

import {BackgroundPatternAnimated} from '@/app/components/BackgroundPatternAnimated';
import HappyIcon from '@/app/components/icons/Happy';
import TokenListHero from '@/app/components/TokenListHero';
import {TokenListTable} from '@/app/components/TokenListTable';
import LEGACY_TOKEN_LISTS from '@/utils/legacyTokenLists';

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
						const searchParams = new URLSearchParams(window.location.search);

						if (!e.target.value) {
							searchParams.delete('search');
						} else {
							searchParams.set('search', e.target.value);
						}

						const newSearch = searchParams.toString();
						const currentPath = window.location.pathname;
						const newPath = newSearch ? `${currentPath}?${newSearch}` : currentPath;
						router.push(newPath);
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
						const newNetwork = Number(e.target.value);
						set_network(newNetwork);

						const searchParams = new URLSearchParams(window.location.search);

						if (newNetwork === -1) {
							searchParams.delete('network');
						} else {
							searchParams.set('network', newNetwork.toString());
						}

						const newSearch = searchParams.toString();
						const currentPath = window.location.pathname;
						const newPath = newSearch ? `${currentPath}?${newSearch}` : currentPath;
						router.push(newPath);
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
	const [viewMode, set_viewMode] = useState<'grid' | 'list'>('grid');
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
				<div className={' relative overflow-hidden rounded-lg !bg-[#FF401A] p-4 md:p-10'}>
					<BackgroundPatternAnimated />
					<div className={'relative z-50 flex w-full flex-row items-center gap-10'}>
						<HappyIcon className={'size-52'} />
						<div className={'rounded-lg bg-white p-4 shadow-lg'}>
							<h2 className={'pb-4 text-xl font-medium'}>
								{'TokenRegistry: Onchain Trust for Every Token'}
							</h2>
							<div className={'text-sm leading-relaxed'}>
								<p className={'pb-2'}>
									{
										'Submit and verify your token fully on-chain with TokenRegistry, featuring standardized metadata, governance-based approval, and permanent IPFS storage.'
									}
								</p>
								<p>
									{
										'Built to power Tokenlistooor and support the broader Web3 ecosystem with transparent, reliable token data.'
									}
								</p>
							</div>
							<div className={'mt-6 flex w-full justify-center'}>
								<Link
									href={'https://tokenregistry.net'}
									target={'_blank'}
									className={'w-full'}>
									<button
										className={
											'rounded-xs focus-visible:ring-[#FF401A]-light disabled:bg-separator disabled:text-subtle dark:ring-offset-neutral-950 inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap bg-[#FF401A]/20 px-4 py-2 text-sm font-medium text-[#FF401A] ring-offset-white transition-colors hover:bg-[#FF401A]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed dark:focus-visible:ring-neutral-300 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'
										}>
										{'Move OnChain'}
									</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className={'mx-auto mt-2 flex w-full max-w-5xl grid-cols-2 flex-col-reverse md:grid'}>
				<div className={'flex flex-row items-center'}>
					<Filters
						allSupportedChains={allSupportedChains}
						network={currentNetwork}
						set_network={set_currentNetwork}
						set_search={set_search}
					/>
					<ViewToggle
						currentView={viewMode}
						onViewChange={set_viewMode}
					/>
				</div>
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
				{viewMode === 'grid' ? (
					<div className={'grid grid-cols-1 gap-6 pb-32 md:grid-cols-3'}>
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
				) : (
					<TokenListTable
						items={listToRender || []}
						network={currentNetwork}
					/>
				)}
			</div>
		</Fragment>
	);
}
export default Lists;
