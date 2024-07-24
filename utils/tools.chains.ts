import {defineChain} from 'viem';
import {
	arbitrum,
	base,
	baseGoerli,
	blast,
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

/*************************************************************************************************
 ** The RARI chain is not available on the Viem library wet, so we define it here manually.
 ** An existing Rejected PR can be consulted here: https://github.com/wevm/viem/pull/1741
 *************************************************************************************************/
const rari = defineChain({
	id: 1380012617,
	name: 'RARI Chain',
	nativeCurrency: {name: 'Ether', symbol: 'ETH', decimals: 18},
	rpcUrls: {
		default: {
			http: ['https://mainnet.rpc.rarichain.org/http']
		}
	},
	blockExplorers: {
		default: {
			name: 'RARI chain explorer',
			url: 'https://mainnet.explorer.rarichain.org/',
			apiUrl: 'https://mainnet.explorer.rarichain.org/api'
		}
	},
	contracts: {
		multicall3: {
			address: '0xb6D5B39F96d379569d47cC84024f3Cd78c5Ef651',
			blockCreated: 0
		}
	}
});

export const supportedNetworks = [
	mainnet,
	{...optimism, name: 'Optimism'},
	bsc,
	blast,
	gnosis,
	polygon,
	polygonZkEvm,
	fantom,
	zkSync,
	base,
	arbitrum,
	rari
];
export const supportedTestNetworks = [goerli, baseGoerli];
export const networks = [...supportedNetworks, ...supportedTestNetworks];

console.warn(indexedWagmiChains);

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
