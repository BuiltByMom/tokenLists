import {
	arbitrum,
	base,
	baseGoerli,
	bsc,
	fantom,
	gnosis,
	goerli,
	mainnet,
	optimism,
	polygon,
	polygonZkEvm,
	zkSync
} from 'wagmi/chains';
import {indexedWagmiChains} from '@builtbymom/web3/utils/wagmi';

import type {TChainContract, TExtendedChain} from '@builtbymom/web3/utils/wagmi';

export const supportedNetworks = [
	mainnet,
	{...optimism, name: 'Optimism'},
	bsc,
	gnosis,
	polygon,
	polygonZkEvm,
	fantom,
	zkSync,
	base,
	arbitrum
];
export const supportedTestNetworks = [goerli, baseGoerli];

export type TAppExtendedChain = TExtendedChain & {
	safeApiUri?: string;
	contracts: {
		nftMigratooorContract?: TChainContract;
	};
};
for (const chain of Object.values(indexedWagmiChains)) {
	if (!chain || typeof chain !== 'object' || !chain.id) {
		continue;
	}
	const extendedChain = chain as TAppExtendedChain;
	extendedChain.contracts = {
		...chain.contracts
	};
}
