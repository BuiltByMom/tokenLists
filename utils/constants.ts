import {
	arbitrum,
	aurora,
	avalanche,
	base,
	baseGoerli,
	blast,
	bsc,
	celo,
	fantom,
	gnosis,
	goerli,
	linea,
	mainnet,
	mantle,
	optimism,
	polygon,
	polygonZkEvm,
	scroll,
	zkSync
} from 'viem/chains';
import {toAddress} from '@builtbymom/web3/utils';
import {indexedWagmiChains} from '@yearn-finance/web-lib/utils/wagmi/utils';

import type {TChainContract, TExtendedChain} from '@yearn-finance/web-lib/utils/wagmi/utils';

export const MATIC_TOKEN_ADDRESS = toAddress('0x0000000000000000000000000000000000001010');
export const POLYGON_LENS_ADDRESS = toAddress('0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d');
export const ETHEREUM_ENS_ADDRESS = toAddress('0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85');

export const HEADER_HEIGHT = 64;

export const SUPPORTED_CHAINS = [
	mainnet,
	optimism,
	bsc,
	gnosis,
	polygon,
	polygonZkEvm,
	fantom,
	zkSync,
	mantle,
	base,
	arbitrum,
	celo,
	avalanche,
	linea,
	scroll,
	aurora,
	blast,
	//Testnets
	goerli,
	baseGoerli
	// localhost
	// sepolia,
	// optimismGoerli,
	// bscTestnet,
	// polygonMumbai,
	// polygonZkEvmTestnet,
	// fantomTestnet,
	// arbitrumGoerli
];

export const SUPPORTED_SMOL_CHAINS = [
	mainnet,
	optimism,
	bsc,
	gnosis,
	polygon,
	polygonZkEvm,
	zkSync,
	base,
	arbitrum,
	goerli,
	baseGoerli
];

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
