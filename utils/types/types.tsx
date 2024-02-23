import type {TAddress, TNDict} from '@builtbymom/web3/types';

export type TTokenListItem = {
	name: string;
	description: string;
	timestamp: string;
	logoURI: string;
	URI: string;
	keywords: string[];
	tokenCount: number;
	metadata: {
		supportedChains: number[];
		tokenCountPerChain: TNDict<number>;
	};
	tokens: {
		address: TAddress;
		name: string;
		symbol: string;
		logoURI: string;
		chainId: number;
		decimals: number;
	}[];
	version: {
		major: number;
		minor: number;
		patch: number;
	};
};
export type TTokenListSummary = {
	name: string;
	timestamp: number;
	logoURI: string;
	lists: TTokenListItem[];
};
