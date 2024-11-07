if (!self.define) {
	let e,
		s = {};
	const c = (c, a) => (
		(c = new URL(c + '.js', a).href),
		s[c] ||
			new Promise(s => {
				if ('document' in self) {
					const e = document.createElement('script');
					(e.src = c), (e.onload = s), document.head.appendChild(e);
				} else (e = c), importScripts(c), s();
			}).then(() => {
				let e = s[c];
				if (!e) throw new Error(`Module ${c} didn’t register its module`);
				return e;
			})
	);
	self.define = (a, i) => {
		const n = e || ('document' in self ? document.currentScript.src : '') || location.href;
		if (s[n]) return;
		let t = {};
		const f = e => c(e, n),
			d = {module: {uri: n}, exports: t, require: f};
		s[n] = Promise.all(a.map(e => d[e] || f(e))).then(e => (i(...e), t));
	};
}
define(['./workbox-1bb06f5e'], function (e) {
	'use strict';
	importScripts(),
		self.skipWaiting(),
		e.clientsClaim(),
		e.precacheAndRoute(
			[
				{
					url: '/_next/static/J5MK9LKN7EG31EdgLSIiT/_buildManifest.js',
					revision: '08d12ef1af633b145a599a5aae46d367'
				},
				{
					url: '/_next/static/J5MK9LKN7EG31EdgLSIiT/_ssgManifest.js',
					revision: 'b6652df95db52feb4daf4eca35380933'
				},
				{url: '/_next/static/chunks/1051.83fb6d61c445dcd4.js', revision: '83fb6d61c445dcd4'},
				{url: '/_next/static/chunks/106.832c32cb3c1b2645.js', revision: '832c32cb3c1b2645'},
				{url: '/_next/static/chunks/1142.190d0818480dff58.js', revision: '190d0818480dff58'},
				{url: '/_next/static/chunks/123.2175423febab125e.js', revision: '2175423febab125e'},
				{url: '/_next/static/chunks/1380.b106908fed17a80d.js', revision: 'b106908fed17a80d'},
				{url: '/_next/static/chunks/1391.673fa65908f6ac9f.js', revision: '673fa65908f6ac9f'},
				{url: '/_next/static/chunks/1586.82256a2c2d79a147.js', revision: '82256a2c2d79a147'},
				{url: '/_next/static/chunks/1627.a230626a41230e96.js', revision: 'a230626a41230e96'},
				{url: '/_next/static/chunks/1758-638a4e5d6f627b8e.js', revision: '638a4e5d6f627b8e'},
				{url: '/_next/static/chunks/1773.eb30300c2dd733ec.js', revision: 'eb30300c2dd733ec'},
				{url: '/_next/static/chunks/1785.31ab8edf671777fc.js', revision: '31ab8edf671777fc'},
				{url: '/_next/static/chunks/1913.16cfa7d50dfe278c.js', revision: '16cfa7d50dfe278c'},
				{url: '/_next/static/chunks/1978.1c8cb5c419281473.js', revision: '1c8cb5c419281473'},
				{url: '/_next/static/chunks/1995.6f3c693f2aff3df1.js', revision: '6f3c693f2aff3df1'},
				{url: '/_next/static/chunks/2004.b6e37bd948c46cbf.js', revision: 'b6e37bd948c46cbf'},
				{url: '/_next/static/chunks/207.4f77d75beec832d5.js', revision: '4f77d75beec832d5'},
				{url: '/_next/static/chunks/2462.69c8368202760127.js', revision: '69c8368202760127'},
				{url: '/_next/static/chunks/2556.3306bd6bd3abefc0.js', revision: '3306bd6bd3abefc0'},
				{url: '/_next/static/chunks/2726.850a865d192df3f0.js', revision: '850a865d192df3f0'},
				{url: '/_next/static/chunks/2753.8d736651e21db97a.js', revision: '8d736651e21db97a'},
				{url: '/_next/static/chunks/2775.8106af4632908b33.js', revision: '8106af4632908b33'},
				{url: '/_next/static/chunks/3072.ab7a2a43c367ac16.js', revision: 'ab7a2a43c367ac16'},
				{url: '/_next/static/chunks/3179.99cf7f9eb6ee27b9.js', revision: '99cf7f9eb6ee27b9'},
				{url: '/_next/static/chunks/3712.3bb821659c21d9c4.js', revision: '3bb821659c21d9c4'},
				{url: '/_next/static/chunks/3810.8751dba2a6f9701c.js', revision: '8751dba2a6f9701c'},
				{url: '/_next/static/chunks/3815.9568f4bea065a5cd.js', revision: '9568f4bea065a5cd'},
				{url: '/_next/static/chunks/3858.68d04a5edf2bf199.js', revision: '68d04a5edf2bf199'},
				{url: '/_next/static/chunks/4050.396dec97dfaec5a8.js', revision: '396dec97dfaec5a8'},
				{url: '/_next/static/chunks/4178.57a6b2703bd84059.js', revision: '57a6b2703bd84059'},
				{url: '/_next/static/chunks/4238.04c860d7e63670dd.js', revision: '04c860d7e63670dd'},
				{url: '/_next/static/chunks/4279.f0cfa10e297f004b.js', revision: 'f0cfa10e297f004b'},
				{url: '/_next/static/chunks/42b88f57.b6b805dd62de0026.js', revision: 'b6b805dd62de0026'},
				{url: '/_next/static/chunks/4300.d8bb1a3dcc746f54.js', revision: 'd8bb1a3dcc746f54'},
				{url: '/_next/static/chunks/4361.e3700bd8cd31d156.js', revision: 'e3700bd8cd31d156'},
				{url: '/_next/static/chunks/4406.0a12142905d9be7b.js', revision: '0a12142905d9be7b'},
				{url: '/_next/static/chunks/4691.81a0a95c70375f30.js', revision: '81a0a95c70375f30'},
				{url: '/_next/static/chunks/4726.bee0a88a8d1ac927.js', revision: 'bee0a88a8d1ac927'},
				{url: '/_next/static/chunks/4920.c1aed5c15e5571a9.js', revision: 'c1aed5c15e5571a9'},
				{url: '/_next/static/chunks/4943.5d66f00527a2fff6.js', revision: '5d66f00527a2fff6'},
				{url: '/_next/static/chunks/50.768a54fd5ac0e7b8.js', revision: '768a54fd5ac0e7b8'},
				{url: '/_next/static/chunks/5252.f7117b94fd23ff30.js', revision: 'f7117b94fd23ff30'},
				{url: '/_next/static/chunks/5260.b1af2a26ecd702b8.js', revision: 'b1af2a26ecd702b8'},
				{url: '/_next/static/chunks/5427.47f3b93b5d660352.js', revision: '47f3b93b5d660352'},
				{url: '/_next/static/chunks/5461.59f221e1befb1c32.js', revision: '59f221e1befb1c32'},
				{url: '/_next/static/chunks/5524.03aafd16862849b6.js', revision: '03aafd16862849b6'},
				{url: '/_next/static/chunks/5532.ff0731f568beeee3.js', revision: 'ff0731f568beeee3'},
				{url: '/_next/static/chunks/5786.4574d2e6c17f6e2f.js', revision: '4574d2e6c17f6e2f'},
				{url: '/_next/static/chunks/5811.8237671af4cfbe7f.js', revision: '8237671af4cfbe7f'},
				{url: '/_next/static/chunks/5883.e4477e9126daa625.js', revision: 'e4477e9126daa625'},
				{url: '/_next/static/chunks/6075.bc19dfa949620eac.js', revision: 'bc19dfa949620eac'},
				{url: '/_next/static/chunks/6148.9ecc5646b11597fa.js', revision: '9ecc5646b11597fa'},
				{url: '/_next/static/chunks/6335.f5d8167e124165f3.js', revision: 'f5d8167e124165f3'},
				{url: '/_next/static/chunks/6366.ea0b37f8d075643e.js', revision: 'ea0b37f8d075643e'},
				{url: '/_next/static/chunks/6438.ddbf8866d3cf106a.js', revision: 'ddbf8866d3cf106a'},
				{url: '/_next/static/chunks/6603.e41573d22142dc91.js', revision: 'e41573d22142dc91'},
				{url: '/_next/static/chunks/6771.ca3c6d85d9593ecf.js', revision: 'ca3c6d85d9593ecf'},
				{url: '/_next/static/chunks/6876.82596acfb5a2334a.js', revision: '82596acfb5a2334a'},
				{url: '/_next/static/chunks/7011.4db80c6bcecca272.js', revision: '4db80c6bcecca272'},
				{url: '/_next/static/chunks/7170.8c4c0673329279e1.js', revision: '8c4c0673329279e1'},
				{url: '/_next/static/chunks/7621.1645d340933fbf52.js', revision: '1645d340933fbf52'},
				{url: '/_next/static/chunks/7761.22cbd8d5e81ef08b.js', revision: '22cbd8d5e81ef08b'},
				{url: '/_next/static/chunks/7777.e73758266340a035.js', revision: 'e73758266340a035'},
				{url: '/_next/static/chunks/8310.05a5ad6353fcd9c8.js', revision: '05a5ad6353fcd9c8'},
				{url: '/_next/static/chunks/8338.f570ee0fd1fc9114.js', revision: 'f570ee0fd1fc9114'},
				{url: '/_next/static/chunks/8345.d330a2517ddd73a0.js', revision: 'd330a2517ddd73a0'},
				{url: '/_next/static/chunks/8452.1d6d64319ef8842f.js', revision: '1d6d64319ef8842f'},
				{url: '/_next/static/chunks/8658.b590170481d7711f.js', revision: 'b590170481d7711f'},
				{url: '/_next/static/chunks/883.08ee44808abafc46.js', revision: '08ee44808abafc46'},
				{url: '/_next/static/chunks/9058.1a200abf24ee92f1.js', revision: '1a200abf24ee92f1'},
				{url: '/_next/static/chunks/9091.21e26e42ac1a12af.js', revision: '21e26e42ac1a12af'},
				{url: '/_next/static/chunks/9117.e0d8e4896a2784c3.js', revision: 'e0d8e4896a2784c3'},
				{url: '/_next/static/chunks/9343.e1f14477c535b6ef.js', revision: 'e1f14477c535b6ef'},
				{url: '/_next/static/chunks/9378.e175d8a1f4ecc866.js', revision: 'e175d8a1f4ecc866'},
				{url: '/_next/static/chunks/9521.c90b2b66b0f028e2.js', revision: 'c90b2b66b0f028e2'},
				{url: '/_next/static/chunks/96.601dcd2b45d643ce.js', revision: '601dcd2b45d643ce'},
				{url: '/_next/static/chunks/9682.57b2d016e786b3e5.js', revision: '57b2d016e786b3e5'},
				{url: '/_next/static/chunks/9983-bd95ca883977fd0f.js', revision: 'bd95ca883977fd0f'},
				{url: '/_next/static/chunks/framework-0e8d27528ba61906.js', revision: '0e8d27528ba61906'},
				{url: '/_next/static/chunks/main-0f94e1326fa49f73.js', revision: '0f94e1326fa49f73'},
				{url: '/_next/static/chunks/pages/_app-8027a0d63559f2f6.js', revision: '8027a0d63559f2f6'},
				{url: '/_next/static/chunks/pages/_error-eb74a452056fea13.js', revision: 'eb74a452056fea13'},
				{url: '/_next/static/chunks/pages/index-feccacb87e1cf96d.js', revision: 'feccacb87e1cf96d'},
				{url: '/_next/static/chunks/pages/list/%5Blist%5D-dbb58f3c7447aaf4.js', revision: 'dbb58f3c7447aaf4'},
				{
					url: '/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js',
					revision: '79330112775102f91e1010318bae2bd3'
				},
				{url: '/_next/static/chunks/webpack-429be97615f72f58.js', revision: '429be97615f72f58'},
				{url: '/_next/static/css/34140af48bdc4961.css', revision: '34140af48bdc4961'},
				{url: '/_next/static/media/0596140cb8d9223a-s.woff2', revision: 'ddd5de66d4a7c56eeac6e0b10c5d8521'},
				{url: '/_next/static/media/1a142ec2652f2d06-s.woff2', revision: 'be388d4ee0f6f0e3c704c90545794e2d'},
				{url: '/_next/static/media/1a4dd1d7cd3232ea-s.woff2', revision: '91c6fe4b62b5ebda5ccee3c4aa1eb33d'},
				{url: '/_next/static/media/2053df8159b25386-s.woff2', revision: '89a487243655b1945e8b173e3632e315'},
				{url: '/_next/static/media/341baa6ce7a16e81-s.woff2', revision: '0c7b4bd9156673a090be9999002eaab1'},
				{url: '/_next/static/media/356abdd51b933898-s.woff2', revision: '4ed5a85b9b460c31a44ba541e277bcc0'},
				{url: '/_next/static/media/64ea2a5aaa4dedd3-s.woff2', revision: '9b04ab384e20d8caa6e96f623bdd9a23'},
				{url: '/_next/static/media/891487401855818d-s.woff2', revision: 'c39f8c869c3ce6e1cecf63da09b0c4f4'},
				{url: '/_next/static/media/9d9b9cae20d87d18-s.woff2', revision: '5fd8c4e4408334cab1a4eb5280e70ff1'},
				{url: '/_next/static/media/b63e4df112f8dce1-s.woff2', revision: 'bfd216fcfe1902b6c614806673a86381'},
				{url: '/_next/static/media/c22ccc5eb58b83e1-s.p.woff2', revision: '8a051a2b61e4a766fff21bb106142860'},
				{url: '/_next/static/media/d70c23d6fe66d464-s.woff2', revision: '7abbd25026a8e3994d885bd8704b9588'},
				{url: '/_next/static/media/dba81c1208da12ee-s.p.woff2', revision: '61ad024295cbcb211b4fda1d44905bf9'},
				{url: '/android-icon-192x192.ico', revision: '3522f6114029893bc7adc5421a8c6e95'},
				{url: '/avatar.png', revision: 'b1e48274eb64a241e89ad52fb47e361f'},
				{url: '/cover.jpg', revision: '6a4de244968766fb41290e52f82aa5d9'},
				{url: '/dumpservices.svg', revision: 'eeb91c3a1b9cc194f6a78ae711c990eb'},
				{url: '/favicons/android-icon-144x144.png', revision: 'f84c22abbaf2104f0a15e5fa7ce57b00'},
				{url: '/favicons/android-icon-192x192.png', revision: '511bcb417298d5c1213764a36560b32f'},
				{url: '/favicons/android-icon-36x36.png', revision: '29c6d2e5a169c485bd3c9ff8d507d06a'},
				{url: '/favicons/android-icon-48x48.png', revision: 'ac8a9ab09e2ad7a4a83a8242e368d955'},
				{url: '/favicons/android-icon-72x72.png', revision: '1558ca8274579e2ec3de8656b4fdbadc'},
				{url: '/favicons/android-icon-96x96.png', revision: '087c1fefc4d8c3405ed3f190fde66488'},
				{url: '/favicons/apple-icon-114x114.png', revision: '636830f827e5ef6a7e311ecb194724e8'},
				{url: '/favicons/apple-icon-120x120.png', revision: '927c6b82f4a9b24625a71f2af0d573c3'},
				{url: '/favicons/apple-icon-144x144.png', revision: '3e450ed21f08e365988e1b4204741414'},
				{url: '/favicons/apple-icon-152x152.png', revision: '9679a0904a815021bcc077c896745035'},
				{url: '/favicons/apple-icon-180x180.png', revision: '3c2ff5ee3103cde01363264bdfb5af30'},
				{url: '/favicons/apple-icon-57x57.png', revision: 'e7263b5f6cffc2f8b5eaacb3d1cb923e'},
				{url: '/favicons/apple-icon-60x60.png', revision: '4f8dd5b7c43677ad0d0280fb2da2c717'},
				{url: '/favicons/apple-icon-72x72.png', revision: '553485edb24f1d2dff0475d7cfaaa179'},
				{url: '/favicons/apple-icon-76x76.png', revision: '1a2296d1b48a640ac2573c943afd4521'},
				{url: '/favicons/apple-icon-precomposed.png', revision: 'a5e9655fc315dac613db287d4c8e1b76'},
				{url: '/favicons/apple-icon.png', revision: 'a5e9655fc315dac613db287d4c8e1b76'},
				{url: '/favicons/browserconfig.xml', revision: '653d077300a12f09a69caeea7a8947f8'},
				{url: '/favicons/favicon-16x16.png', revision: '5b3a238a137b1131203647aa86566db6'},
				{url: '/favicons/favicon-32x32.png', revision: '23b4db369271952e5181e4821a4110d2'},
				{url: '/favicons/favicon-96x96.png', revision: 'f28206c4fd55681bc94f5eb988754213'},
				{url: '/favicons/favicon.ico', revision: '4cdcbe3ad9c6ebe78cdc084448c06753'},
				{url: '/favicons/favicon.svg', revision: '6d222efc790057eab4b7861734a9b7c1'},
				{url: '/favicons/manifest.json', revision: 'cedc58bb031b4647806e1dedaffee50e'},
				{url: '/favicons/migratooor.png', revision: 'c4b113e92e2bb184bc38d51d155fbe9a'},
				{url: '/favicons/ms-icon-144x144.png', revision: '3e450ed21f08e365988e1b4204741414'},
				{url: '/favicons/ms-icon-150x150.png', revision: 'b8562b84bdb01e15ac2a9da77851f7d0'},
				{url: '/favicons/ms-icon-310x310.png', revision: '11d6296e7dd481a314efc70319b0bd2c'},
				{url: '/favicons/ms-icon-70x70.png', revision: '3f0ee0a51145090f43afd16ae01f7023'},
				{url: '/hero.jpg', revision: 'cf79e58bc70764bb684a3def9adce41f'},
				{url: '/manifest.json', revision: 'a9d80e671daa9979af521321d9b72d32'},
				{url: '/og.png', revision: '6db3b275535fd4ca1668a70b9695c519'},
				{url: '/og_disperse.png', revision: '784c32d2acff860ebe51ee8120f0ffa5'},
				{url: '/og_migratooor.png', revision: 'f1a18c476bb8dade1a82cd8bea7af5ac'},
				{url: '/og_multisafe.png', revision: '326c84f0a57cb17ecaef9a53f754afe9'},
				{url: '/og_tokenlistooor.png', revision: '4ffbb2ea6468d9045af942d00465cd9a'},
				{url: '/placeholder-nft.png', revision: '0a5319ce91d205bd2dbbeb5de2d1dcaa'},
				{url: '/placeholder.png', revision: '76e4abc63869962750bcd60694719807'},
				{url: '/token-placeholder.png', revision: '63a4606fa310d550bd5b87e2ffc64658'}
			],
			{ignoreURLParametersMatching: []}
		),
		e.cleanupOutdatedCaches(),
		e.registerRoute(
			'/',
			new e.NetworkFirst({
				cacheName: 'start-url',
				plugins: [
					{
						cacheWillUpdate: async ({request: e, response: s, event: c, state: a}) =>
							s && 'opaqueredirect' === s.type
								? new Response(s.body, {status: 200, statusText: 'OK', headers: s.headers})
								: s
					}
				]
			}),
			'GET'
		),
		e.registerRoute(
			/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
			new e.CacheFirst({
				cacheName: 'google-fonts-webfonts',
				plugins: [new e.ExpirationPlugin({maxEntries: 4, maxAgeSeconds: 31536e3})]
			}),
			'GET'
		),
		e.registerRoute(
			/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
			new e.StaleWhileRevalidate({
				cacheName: 'google-fonts-stylesheets',
				plugins: [new e.ExpirationPlugin({maxEntries: 4, maxAgeSeconds: 604800})]
			}),
			'GET'
		),
		e.registerRoute(
			/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'static-font-assets',
				plugins: [new e.ExpirationPlugin({maxEntries: 4, maxAgeSeconds: 604800})]
			}),
			'GET'
		),
		e.registerRoute(
			/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'static-image-assets',
				plugins: [new e.ExpirationPlugin({maxEntries: 64, maxAgeSeconds: 86400})]
			}),
			'GET'
		),
		e.registerRoute(
			/\/_next\/image\?url=.+$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'next-image',
				plugins: [new e.ExpirationPlugin({maxEntries: 64, maxAgeSeconds: 86400})]
			}),
			'GET'
		),
		e.registerRoute(
			/\.(?:mp3|wav|ogg)$/i,
			new e.CacheFirst({
				cacheName: 'static-audio-assets',
				plugins: [new e.RangeRequestsPlugin(), new e.ExpirationPlugin({maxEntries: 32, maxAgeSeconds: 86400})]
			}),
			'GET'
		),
		e.registerRoute(
			/\.(?:mp4)$/i,
			new e.CacheFirst({
				cacheName: 'static-video-assets',
				plugins: [new e.RangeRequestsPlugin(), new e.ExpirationPlugin({maxEntries: 32, maxAgeSeconds: 86400})]
			}),
			'GET'
		),
		e.registerRoute(
			/\.(?:js)$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'static-js-assets',
				plugins: [new e.ExpirationPlugin({maxEntries: 32, maxAgeSeconds: 86400})]
			}),
			'GET'
		),
		e.registerRoute(
			/\.(?:css|less)$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'static-style-assets',
				plugins: [new e.ExpirationPlugin({maxEntries: 32, maxAgeSeconds: 86400})]
			}),
			'GET'
		),
		e.registerRoute(
			/\/_next\/data\/.+\/.+\.json$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'next-data',
				plugins: [new e.ExpirationPlugin({maxEntries: 32, maxAgeSeconds: 86400})]
			}),
			'GET'
		),
		e.registerRoute(
			/\.(?:json|xml|csv)$/i,
			new e.NetworkFirst({
				cacheName: 'static-data-assets',
				plugins: [new e.ExpirationPlugin({maxEntries: 32, maxAgeSeconds: 86400})]
			}),
			'GET'
		),
		e.registerRoute(
			({url: e}) => {
				if (!(self.origin === e.origin)) return !1;
				const s = e.pathname;
				return !s.startsWith('/api/auth/') && !!s.startsWith('/api/');
			},
			new e.NetworkFirst({
				cacheName: 'apis',
				networkTimeoutSeconds: 10,
				plugins: [new e.ExpirationPlugin({maxEntries: 16, maxAgeSeconds: 86400})]
			}),
			'GET'
		),
		e.registerRoute(
			({url: e}) => {
				if (!(self.origin === e.origin)) return !1;
				return !e.pathname.startsWith('/api/');
			},
			new e.NetworkFirst({
				cacheName: 'others',
				networkTimeoutSeconds: 10,
				plugins: [new e.ExpirationPlugin({maxEntries: 32, maxAgeSeconds: 86400})]
			}),
			'GET'
		),
		e.registerRoute(
			({url: e}) => !(self.origin === e.origin),
			new e.NetworkFirst({
				cacheName: 'cross-origin',
				networkTimeoutSeconds: 10,
				plugins: [new e.ExpirationPlugin({maxEntries: 32, maxAgeSeconds: 3600})]
			}),
			'GET'
		);
});
