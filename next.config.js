/* eslint-disable @typescript-eslint/explicit-function-return-type */
const withPWA = require('next-pwa')({
	dest: 'public',
	disable: process.env.NODE_ENV !== 'production'
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	assetPrefix: process.env.IPFS_BUILD === 'true' ? './' : '/',
	images: {
		unoptimized: process.env.IPFS_BUILD === 'true',
		remotePatterns: [
			{hostname: 'gib.to'},
			{hostname: 'rawcdn.githack.com'},
			{hostname: 'raw.githubusercontent.com'},
			{hostname: 'ipfs.io'},
			{hostname: 's3.amazonaws.com'},
			{hostname: '1inch.exchange'},
			{hostname: 'hut34.io'},
			{hostname: 'www.coingecko.com'},
			{hostname: 'defiprime.com'},
			{hostname: 'cdn.furucombo.app'},
			{hostname: 'gemini.com'},
			{hostname: 'messari.io'},
			{hostname: 'ethereum-optimism.github.io'},
			{hostname: 'tryroll.com'},
			{hostname: 'logo.assets.tkn.eth.limo'},
			{hostname: 'umaproject.org'},
			{hostname: 'cloudflare-ipfs.com'},
			{hostname: 'assets.smold.app'}
		]
	},
	redirects: async () => [
		{
			source: '/tokenlistooor/:path*',
			destination: '/list/:path*',
			permanent: true
		},
		{
			source: '/github',
			destination: 'https://github.com/SmolDapp/smoldapp',
			permanent: true
		}
	],
	rewrites: async () => [
		{
			source: '/js/script.js',
			destination: 'https://plausible.io/js/script.js'
		},
		{
			source: '/api/event',
			destination: 'https://plausible.io/api/event'
		}
	],
	env: {
		PROJECT_SLUG: 'smoldapp',
		JSON_RPC_URL: {
			1: process.env.RPC_URL_MAINNET,
			5: process.env.RPC_URL_GOERLI,
			10: process.env.RPC_URL_OPTIMISM,
			56: process.env.RPC_URL_BINANCE,
			97: process.env.RPC_URL_BINANCE_TESTNET,
			137: process.env.RPC_URL_POLYGON,
			250: process.env.RPC_URL_FANTOM,
			420: process.env.RPC_URL_OPTIMISM_GOERLI,
			8453: process.env.RPC_URL_BASE,
			80001: process.env.RPC_URL_POLYGON_TESTNET,
			42161: process.env.RPC_URL_ARBITRUM,
			11155111: process.env.RPC_URL_SEPOLIA
		},
		ALCHEMY_KEY: process.env.ALCHEMY_KEY,
		ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY,
		INFURA_PROJECT_ID: process.env.INFURA_PROJECT_ID,
		OPENSEA_API_KEY: process.env.OPENSEA_API_KEY,
		SMOL_ASSETS_URL: 'https://assets.smold.app/api',

		// Wallet Connect modal configuration
		WALLETCONNECT_PROJECT_ID: process.env.WALLETCONNECT_PROJECT_ID,
		WALLETCONNECT_PROJECT_NAME: 'Smol',
		WALLETCONNECT_PROJECT_DESCRIPTION:
			'Simple, smart and elegant dapps, designed to make your crypto journey a little bit easier.',
		WALLETCONNECT_PROJECT_URL: 'https://smold.app',
		WALLETCONNECT_PROJECT_ICON: 'https://smold.app/favicons/ms-icon-310x310.png',

		RECEIVER_ADDRESS: '0x10001192576E8079f12d6695b0948C2F41320040',
		DISPERSE_ADDRESS: '0xD152f549545093347A162Dce210e7293f1452150'
	}
};

module.exports = withPWA(nextConfig);
