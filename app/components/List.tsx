'use client';

import React, {useMemo, useState} from 'react';
import {toast} from 'react-hot-toast';
import Link from 'next/link';
import {useParams, useRouter} from 'next/navigation';
import {extend} from 'dayjs';
import dayjsDuration from 'dayjs/plugin/duration.js';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import weekday from 'dayjs/plugin/weekday.js';
import * as chains from 'wagmi/chains';
import {motion} from 'framer-motion';
import {getNetwork} from '@builtbymom/web3/utils/wagmi';
import {useMountEffect} from '@react-hookz/web';

import Button from './Button';
import {IconSocialGithub} from './icons/IconSocialGithub';

import type {Variants} from 'framer-motion';
import type {ReactElement} from 'react';
import type {TNDict} from '@builtbymom/web3/types';
import type {TExtendedChain} from '@builtbymom/web3/utils/wagmi';
import type {TTokenListItem} from '@utils/types/types';

import {DownloadAssetButton} from '@/app/components/DownloadAssetButton';
import {EmptyListMessage} from '@/app/components/EmptyListMessage';
import {ImageWithFallback} from '@/app/components/ImageWithFallback';

extend(relativeTime);
extend(dayjsDuration);
extend(weekday);

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

function TokenListHero({list}: {list: TTokenListItem}): ReactElement {
	const fileName = (list.URI || '')
		.toLowerCase()
		.replace('https://raw.githubusercontent.com/smoldapp/tokenlists/main/lists/', '');

	return (
		<div className={'relative isolate mt-6'}>
			<div className={'mx-auto grid max-w-5xl grid-cols-1 pb-0 pt-10 md:grid-cols-1 md:pb-10 md:pt-20'}>
				<div className={'relative w-full'}>
					<div className={'absolute -top-10 left-0'}>
						<Link href={'/'}>
							<p
								className={
									'text-xs text-neutral-900 transition-all hover:text-neutral-900 hover:underline disabled:text-neutral-900/40'
								}>
								{'◁ Back'}
							</p>
						</Link>
					</div>
					<div className={'absolute -top-10 right-0'}>
						<div
							className={
								'w-full rounded-md border border-dashed border-neutral-300 bg-neutral-0 px-3 py-1 text-xs leading-6 text-neutral-900/60 md:text-sm'
							}>
							{'Last update: '}
							<span className={'inline-flex items-center pl-2 font-bold text-neutral-900'}>
								<span>{list.timestamp}</span>
							</span>
						</div>
					</div>
					<div>
						<ImageWithFallback
							unoptimized
							src={
								(list.logoURI || '').startsWith('ipfs://')
									? `https://ipfs.io/ipfs/${list.logoURI.replace('ipfs://', '')}`
									: list.logoURI
							}
							altSrc={
								(list.logoURI || '').startsWith('ipfs://')
									? `https://ipfs.io/ipfs/${list.logoURI.replace('ipfs://', '')}`
									: list.logoURI
							}
							width={64}
							height={64}
							alt={''}
						/>
					</div>
					<h1 className={'mt-1 text-3xl font-bold tracking-tight text-neutral-900 md:mt-1 md:text-4xl'}>
						{list.name}
					</h1>
					<div
						className={'mt-4 text-base leading-normal text-neutral-900/60 md:mt-6 md:text-lg md:leading-8'}>
						{list.description || `A list of token for ${list.name}`}
						<p className={'text-sm'}>
							{'Version: '}
							{list.version.major}
							{'.'}
							{list.version.minor}
							{'.'}
							{list.version.patch}
						</p>
					</div>
					<div className={'mt-6 flex items-center gap-x-6 md:mt-10'}>
						<Link
							href={`https://github.com/SmolDapp/tokenLists/blob/main/lists/${fileName}`}
							target={'_blank'}>
							<Button>
								<IconSocialGithub className={'mr-4 size-6'} />
								{'Github'}
							</Button>
						</Link>
						<Link
							href={list.URI}
							target={'_blank'}>
							<Button>{'Open JSON'}</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

function TokenListItem({item}: {item: TTokenListItem['tokens'][0]}): ReactElement {
	const params = useParams();
	const currentNetwork = useMemo((): TExtendedChain => {
		try {
			return getNetwork(item.chainId);
		} catch (error) {
			return {} as TExtendedChain;
		}
	}, [item.chainId]);

	const isLogoInAssetLists = (item.logoURI || '').includes('assets.smold.app');
	const isSmolAssetsPage = params.list === 'smolAssets';
	const shouldDisplayDownloadButtons = isLogoInAssetLists && isSmolAssetsPage;

	const downloadAssetCommonParams = {
		address: item.address,
		chainId: item.chainId,
		fileName: item.symbol,
		onSuccess: () => toast.success(`Succesfully dowloaded ${item.symbol} asset`)
	};

	return (
		<div className={'grid w-full grid-cols-12 items-center gap-4'}>
			<div className={'col-span-12 flex flex-row items-center space-x-6 md:col-span-10'}>
				<ImageWithFallback
					alt={`${item.address}_${item.name}_${item.symbol}`}
					width={40}
					height={40}
					quality={90}
					unoptimized
					src={item.logoURI || ''}
				/>
				<div>
					<p className={'text-sm'}>
						{item.name}
						<span className={'text-xs text-neutral-900/60'}>{` - (${item.symbol})`}</span>
					</p>
					<div
						className={
							'font-number mt-2 flex flex-col flex-wrap content-around gap-1 !font-mono text-xxs text-neutral-900/60 transition-colors md:flex-row md:items-center md:gap-6 md:text-xs'
						}>
						<span>
							<a
								href={`${
									currentNetwork.blockExplorers?.etherscan?.url || 'https://etherscan.io'
								}/token/${item.address}`}
								target={'_blank'}
								rel={'noreferrer'}
								className={'font-mono hover:text-neutral-900 hover:underline'}>
								{item.address}
							</a>
							{` • ${item.decimals} decimals`}
						</span>
						{isLogoInAssetLists && shouldDisplayDownloadButtons && (
							<div className={'flex items-center gap-2'}>
								{'Icon: '}
								<div className={'flex gap-1'}>
									<DownloadAssetButton
										{...downloadAssetCommonParams}
										type={'png'}
									/>
									<DownloadAssetButton
										{...downloadAssetCommonParams}
										type={'svg'}
									/>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>

			<div className={'col-span-12 flex justify-end text-right md:col-span-2'}>
				<div>
					<p className={'block text-xxs text-neutral-700 md:text-xs'}>{'Chain'}</p>
					<b>{currentNetwork.name || `Chain ${item.chainId}`}</b>
				</div>
			</div>
		</div>
	);
}

function TokenListContent({list}: {list: TTokenListItem}): ReactElement {
	const params = useParams();
	const router = useRouter();
	const [currentPage, set_currentPage] = useState(1);
	const [itemsPerPage] = useState(50);
	const [search, set_search] = useState('');
	const [network, set_network] = useState(-1);
	useMountEffect((): void => {
		const {page, search} = params;
		if (page) {
			set_currentPage(Number(page));
		}
		if (search) {
			set_search(String(search));
		}
	});

	const availableNetworks = useMemo((): {value: number; label: string}[] => {
		const networks: {value: number; label: string}[] = [];
		const exists: TNDict<boolean> = {};
		list.tokens.forEach((item): void => {
			const network = Object.values(chains).find((network): boolean => network.id === item.chainId);
			if (network) {
				if (exists[network.id]) {
					return;
				}
				exists[network.id] = true;
				networks.push({
					value: network.id,
					label: network.name
				});
			}
		});
		return networks;
	}, [list.tokens]);

	const searchResult = useMemo((): TTokenListItem['tokens'] => {
		return list.tokens
			.filter((item): boolean => {
				if (network === -1) {
					return true;
				}
				return item.chainId === network;
			})
			.filter((item): boolean => {
				if (!search) {
					return true;
				}
				return (
					(item.name || '').toLowerCase().startsWith(search.toLowerCase()) ||
					(item.symbol || '').toLowerCase().startsWith(search.toLowerCase()) ||
					((item.address as string) || '').toLowerCase().startsWith(search.toLowerCase())
				);
			});
	}, [list.tokens, search, network]);

	const isSearchResultEmpty = searchResult.length === 0;
	const isSmolAssetsPage = params.list === 'smolAssets';
	const emptyListMessage = "Oh no! Looks like we don't have that token in stock.";
	const smolEmptyListMessage = (
		<span>
			<br />
			<span>{'Want to add it? Submit a pull request with the token contract and logo on the '}</span>
			<Link
				className={'font-semibold text-black hover:underline'}
				target={'_blank'}
				href={'https://github.com/SmolDapp/tokenLists/tree/main'}>
				{'repo'}
			</Link>

			<span>{" and we'll get it added for you. Teamwork!"}</span>
		</span>
	);

	return (
		<div className={'mx-auto grid w-full max-w-5xl pb-32'}>
			<div className={'flex items-center space-x-4 py-4 md:pt-0'}>
				<div>
					<input
						className={
							'rounded-md border border-neutral-200 bg-neutral-0 px-3 py-1 text-xs leading-6 text-neutral-900/60 md:text-sm'
						}
						type={'text'}
						placeholder={'Search'}
						onChange={(e): void => {
							set_search(e.target.value || '');
							set_currentPage(1);

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
							'rounded-md border border-neutral-200 bg-neutral-0 px-3 py-1 pr-10 text-xs leading-6 text-neutral-900/60 md:text-sm'
						}
						value={network}
						onChange={(e): void => {
							const newNetwork = Number(e.target.value);
							set_network(newNetwork);
							set_currentPage(1);

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
						{availableNetworks.map(
							(network): ReactElement => (
								<option
									key={network.value}
									value={network.value}>
									{network.label}
								</option>
							)
						)}
					</select>
				</div>
			</div>
			<div
				className={
					'grid grid-cols-1 divide-y divide-neutral-400 rounded-md border border-neutral-200 bg-neutral-0 md:grid-cols-1'
				}>
				{isSearchResultEmpty ? (
					<div className={'px-10'}>
						<EmptyListMessage>
							{emptyListMessage} {isSmolAssetsPage && smolEmptyListMessage}
						</EmptyListMessage>
					</div>
				) : (
					searchResult.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(
						(item): ReactElement => (
							<motion.div
								key={`${item.address}_${item.chainId}`}
								custom={0}
								initial={'initial'}
								whileInView={'enter'}
								variants={variants as Variants}
								className={'hover:bg-neutral-50/40 relative flex w-full p-4 transition-colors md:p-6'}>
								<TokenListItem item={item} />
							</motion.div>
						)
					)
				)}
			</div>
			<div className={'flex items-center justify-between pt-4'}>
				<div className={'flex flex-row space-x-6'}>
					<div>
						<button
							className={
								'cursor-pointer text-xs text-neutral-900/60 transition-all hover:text-neutral-900 hover:underline disabled:text-neutral-900/40'
							}
							type={'button'}
							disabled={currentPage === 1}
							onClick={(): void => {
								set_currentPage(1);
								window.scrollTo({top: 0, behavior: 'smooth'});
								router.push(`/${params.toString()}&page=1`);
							}}>
							{'◁◁ '}
						</button>
					</div>
					<div>
						<div>
							<button
								className={
									'cursor-pointer text-xs text-neutral-900/60 transition-all hover:text-neutral-900 hover:underline disabled:text-neutral-900/40'
								}
								type={'button'}
								disabled={currentPage === 1}
								onClick={(): void => {
									set_currentPage(currentPage - 1);
									window.scrollTo({top: 0, behavior: 'smooth'});
									router.push(`/${params.toString()}&page=${currentPage - 1}`);
								}}>
								{'◁ Previous'}
							</button>
						</div>
					</div>
				</div>
				<div>
					<span className={'text-xs text-neutral-900/60'}>
						{`Page ${currentPage} of ${Math.ceil(searchResult.length / itemsPerPage)}`}
					</span>
				</div>
				<div className={'flex flex-row space-x-6'}>
					<div>
						<div>
							<button
								className={
									'text-xs text-neutral-900/60 transition-all hover:text-neutral-900 hover:underline disabled:text-neutral-900/40'
								}
								type={'button'}
								disabled={
									currentPage === Math.ceil(searchResult.length / itemsPerPage) || isSearchResultEmpty
								}
								onClick={(): void => {
									set_currentPage(currentPage + 1);
									window.scrollTo({top: 0, behavior: 'smooth'});
									router.push(`/${params.toString()}&page=${currentPage + 1}`);
								}}>
								{'Next ▷'}
							</button>
						</div>
					</div>
					<div>
						<button
							className={
								'cursor-pointer text-xs text-neutral-900/60 transition-all hover:text-neutral-900 hover:underline disabled:text-neutral-900/40'
							}
							type={'button'}
							disabled={
								currentPage === Math.ceil(searchResult.length / itemsPerPage) || isSearchResultEmpty
							}
							onClick={(): void => {
								set_currentPage(Math.ceil(searchResult.length / itemsPerPage));
								window.scrollTo({top: 0, behavior: 'smooth'});
								router.push(
									`/${params.toString()}&page=${Math.ceil(searchResult.length / itemsPerPage)}`
								);
							}}>
							{' ▷▷'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

function List({list}: {list: TTokenListItem}): ReactElement {
	return (
		<>
			<TokenListHero list={list} />
			<TokenListContent list={list} />
		</>
	);
}
export default List;
