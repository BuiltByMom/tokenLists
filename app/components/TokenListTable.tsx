import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import {formatAmount} from '@builtbymom/web3/utils';

import type {ReactElement} from 'react';
import type {TTokenListItem} from '@utils/types/types';

import {ImageWithFallback} from '@/app/components/ImageWithFallback';

type TTokenListTableProps = {
	items: TTokenListItem[];
	network: number;
};

export function TokenListTable({items, network}: TTokenListTableProps): ReactElement {
	return (
		<div className={'mb-10 w-full overflow-x-auto rounded-lg border border-neutral-400'}>
			<table className={'w-full'}>
				<thead>
					<tr className={'border-b border-neutral-400 bg-neutral-0'}>
						<th className={'px-4 py-3 text-left text-sm font-medium'}>{'Name'}</th>
						<th className={'px-4 py-3 text-right text-sm font-medium'}>{'Version'}</th>
						<th className={'px-4 py-3 text-right text-sm font-medium'}>{'Tokens'}</th>
						<th className={'px-4 py-3 text-right text-sm font-medium'}>{'View'}</th>
					</tr>
				</thead>
				<tbody className={'divide-y divide-neutral-400'}>
					{items.map(item => {
						const fileName = (item.URI || '')
							.toLowerCase()
							.replace('https://raw.githubusercontent.com/smoldapp/tokenlists/main/lists/', '');

						return (
							<tr
								key={item.URI}
								className={'hover:bg-neutral-50 bg-neutral-0'}>
								<td className={'px-4 py-3'}>
									<Link
										href={`/list/${fileName.replace('.json', '')}`}
										className={'flex items-center gap-3'}>
										<ImageWithFallback
											unoptimized
											src={item.logoURI || ''}
											altSrc={
												(item.logoURI || '').startsWith('ipfs://')
													? `https://ipfs.io/ipfs/${(item.logoURI || '').replace('ipfs://', '')}`
													: item.logoURI || ''
											}
											width={40}
											height={40}
											alt={''}
											className={'rounded-full'}
										/>
										<div>
											<span className={'font-medium'}>{item.name}</span>
											<p className={'max-w-xl text-sm text-neutral-600'}>
												{item.description || `A list of token for ${item.name}`}
											</p>
										</div>
									</Link>
								</td>
								<td className={'px-4 py-3 text-right text-sm'}>
									{`v${item.version.major}.${item.version.minor}.${item.version.patch}`}
								</td>
								<td className={'px-4 py-3 text-right font-medium'}>
									{formatAmount(
										network === -1
											? item.tokenCount
											: item.metadata.tokenCountPerChain[network] || 0,
										0,
										0
									)}
								</td>
								<td className={'px-4 py-3 text-right font-medium'}>
									<Link href={`/list/${fileName.replace('.json', '')}`}>
										<button className={'text-sm text-neutral-600'}>
											<ArrowUpRight />
										</button>
									</Link>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
