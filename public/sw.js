if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,i)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let t={};const d=e=>a(e,n),r={module:{uri:n},exports:t,require:d};s[n]=Promise.all(c.map((e=>r[e]||d(e)))).then((e=>(i(...e),t)))}}define(["./workbox-9b4d2a02"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/3-scYIugBAhPK9265A4c4/_buildManifest.js",revision:"96b41c109757b65c9d1f82a056b11945"},{url:"/_next/static/3-scYIugBAhPK9265A4c4/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/135.67fab15ebc7d852e.js",revision:"67fab15ebc7d852e"},{url:"/_next/static/chunks/1391.51321de0871c4fb2.js",revision:"51321de0871c4fb2"},{url:"/_next/static/chunks/1424.c15d7e6321ca35d6.js",revision:"c15d7e6321ca35d6"},{url:"/_next/static/chunks/1608.ec04f07937386922.js",revision:"ec04f07937386922"},{url:"/_next/static/chunks/1711.ae2b84d9f5645069.js",revision:"ae2b84d9f5645069"},{url:"/_next/static/chunks/1727.af62bd633f21ee69.js",revision:"af62bd633f21ee69"},{url:"/_next/static/chunks/1748.f63b451fd93f590b.js",revision:"f63b451fd93f590b"},{url:"/_next/static/chunks/1785.917554ec11170a82.js",revision:"917554ec11170a82"},{url:"/_next/static/chunks/1950.c8039f3dc9bb92f5.js",revision:"c8039f3dc9bb92f5"},{url:"/_next/static/chunks/1961.e8c3dc6172d4bfaa.js",revision:"e8c3dc6172d4bfaa"},{url:"/_next/static/chunks/2499.35ce5e68cbda83d7.js",revision:"35ce5e68cbda83d7"},{url:"/_next/static/chunks/2604.250be1a3b8354750.js",revision:"250be1a3b8354750"},{url:"/_next/static/chunks/2632.91a0113279d2b3e2.js",revision:"91a0113279d2b3e2"},{url:"/_next/static/chunks/2746.0a838d09eabc5b43.js",revision:"0a838d09eabc5b43"},{url:"/_next/static/chunks/2840.7001450c4c1f4ea0.js",revision:"7001450c4c1f4ea0"},{url:"/_next/static/chunks/2896.5ee6626961037489.js",revision:"5ee6626961037489"},{url:"/_next/static/chunks/2898.f370a64b5af02f0b.js",revision:"f370a64b5af02f0b"},{url:"/_next/static/chunks/3138.2fbd236437ca2ad0.js",revision:"2fbd236437ca2ad0"},{url:"/_next/static/chunks/3200.07a96119d145f2e1.js",revision:"07a96119d145f2e1"},{url:"/_next/static/chunks/3525.53072abba3ca74b8.js",revision:"53072abba3ca74b8"},{url:"/_next/static/chunks/3688.d161b107f65da93d.js",revision:"d161b107f65da93d"},{url:"/_next/static/chunks/3760.527e299df66f1ddf.js",revision:"527e299df66f1ddf"},{url:"/_next/static/chunks/4253.6be69df622e36e45.js",revision:"6be69df622e36e45"},{url:"/_next/static/chunks/4419.c4f2007bfe36ec14.js",revision:"c4f2007bfe36ec14"},{url:"/_next/static/chunks/4507.929b32e591e50f8b.js",revision:"929b32e591e50f8b"},{url:"/_next/static/chunks/4583.205bbdd6677d7c00.js",revision:"205bbdd6677d7c00"},{url:"/_next/static/chunks/499.6095a9b4c3d3fa0b.js",revision:"6095a9b4c3d3fa0b"},{url:"/_next/static/chunks/5002-2fe3884de1fe178c.js",revision:"2fe3884de1fe178c"},{url:"/_next/static/chunks/5119.33e08a0525159056.js",revision:"33e08a0525159056"},{url:"/_next/static/chunks/5488.ea86c6ce443ba3bd.js",revision:"ea86c6ce443ba3bd"},{url:"/_next/static/chunks/5515.4b5c8b150669b6f5.js",revision:"4b5c8b150669b6f5"},{url:"/_next/static/chunks/5710.5bdbdbf21f1c3db3.js",revision:"5bdbdbf21f1c3db3"},{url:"/_next/static/chunks/5806.7abe5840ceba140e.js",revision:"7abe5840ceba140e"},{url:"/_next/static/chunks/5811.779d111d77aa1942.js",revision:"779d111d77aa1942"},{url:"/_next/static/chunks/5850.7614426d4dcdcc86.js",revision:"7614426d4dcdcc86"},{url:"/_next/static/chunks/5883.e4477e9126daa625.js",revision:"e4477e9126daa625"},{url:"/_next/static/chunks/5939.0a433dc6f963fc41.js",revision:"0a433dc6f963fc41"},{url:"/_next/static/chunks/6210.e879386a01d249b4.js",revision:"e879386a01d249b4"},{url:"/_next/static/chunks/6237.f7b1d24c812922e4.js",revision:"f7b1d24c812922e4"},{url:"/_next/static/chunks/6253.dcdff54f0dceda1f.js",revision:"dcdff54f0dceda1f"},{url:"/_next/static/chunks/6328.ea13afa99496d818.js",revision:"ea13afa99496d818"},{url:"/_next/static/chunks/6551.432f96462db0d036.js",revision:"432f96462db0d036"},{url:"/_next/static/chunks/6626.1c904d6d48510b00.js",revision:"1c904d6d48510b00"},{url:"/_next/static/chunks/6878.5657c32e06476a2e.js",revision:"5657c32e06476a2e"},{url:"/_next/static/chunks/704.484bcd9e0a7f5626.js",revision:"484bcd9e0a7f5626"},{url:"/_next/static/chunks/7682.b0a3567fac8e0052.js",revision:"b0a3567fac8e0052"},{url:"/_next/static/chunks/794.f18da82915d63734.js",revision:"f18da82915d63734"},{url:"/_next/static/chunks/8137.d6c500ddcf42e542.js",revision:"d6c500ddcf42e542"},{url:"/_next/static/chunks/8366.656bbd943f76fa86.js",revision:"656bbd943f76fa86"},{url:"/_next/static/chunks/8881.8c985300b37d631a.js",revision:"8c985300b37d631a"},{url:"/_next/static/chunks/8906.7becb64cf75ab6af.js",revision:"7becb64cf75ab6af"},{url:"/_next/static/chunks/9212.79924379b5549586.js",revision:"79924379b5549586"},{url:"/_next/static/chunks/9223.882cd6b61a640a13.js",revision:"882cd6b61a640a13"},{url:"/_next/static/chunks/934.405a73de74b58e27.js",revision:"405a73de74b58e27"},{url:"/_next/static/chunks/9343.5e3f8080f07b572a.js",revision:"5e3f8080f07b572a"},{url:"/_next/static/chunks/9600.5accbcbb008d261e.js",revision:"5accbcbb008d261e"},{url:"/_next/static/chunks/9941.44044767831d9eb0.js",revision:"44044767831d9eb0"},{url:"/_next/static/chunks/framework-314c182fa7e2bf37.js",revision:"314c182fa7e2bf37"},{url:"/_next/static/chunks/main-3ddf7c7ae205ab0d.js",revision:"3ddf7c7ae205ab0d"},{url:"/_next/static/chunks/pages/_app-664ca55c58b01b2a.js",revision:"664ca55c58b01b2a"},{url:"/_next/static/chunks/pages/_error-2b35abdd95bbce4e.js",revision:"2b35abdd95bbce4e"},{url:"/_next/static/chunks/pages/index-f8ea6e09c88a5a54.js",revision:"f8ea6e09c88a5a54"},{url:"/_next/static/chunks/pages/list/%5Blist%5D-e7fb4ffe3e03e018.js",revision:"e7fb4ffe3e03e018"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-348caa3a153b604e.js",revision:"348caa3a153b604e"},{url:"/_next/static/css/7279def7f889670a.css",revision:"7279def7f889670a"},{url:"/_next/static/media/0596140cb8d9223a-s.woff2",revision:"ddd5de66d4a7c56eeac6e0b10c5d8521"},{url:"/_next/static/media/1a142ec2652f2d06-s.woff2",revision:"be388d4ee0f6f0e3c704c90545794e2d"},{url:"/_next/static/media/1a4dd1d7cd3232ea-s.woff2",revision:"91c6fe4b62b5ebda5ccee3c4aa1eb33d"},{url:"/_next/static/media/2053df8159b25386-s.woff2",revision:"89a487243655b1945e8b173e3632e315"},{url:"/_next/static/media/341baa6ce7a16e81-s.woff2",revision:"0c7b4bd9156673a090be9999002eaab1"},{url:"/_next/static/media/356abdd51b933898-s.woff2",revision:"4ed5a85b9b460c31a44ba541e277bcc0"},{url:"/_next/static/media/64ea2a5aaa4dedd3-s.woff2",revision:"9b04ab384e20d8caa6e96f623bdd9a23"},{url:"/_next/static/media/891487401855818d-s.woff2",revision:"c39f8c869c3ce6e1cecf63da09b0c4f4"},{url:"/_next/static/media/9d9b9cae20d87d18-s.woff2",revision:"5fd8c4e4408334cab1a4eb5280e70ff1"},{url:"/_next/static/media/b63e4df112f8dce1-s.woff2",revision:"bfd216fcfe1902b6c614806673a86381"},{url:"/_next/static/media/c22ccc5eb58b83e1-s.p.woff2",revision:"8a051a2b61e4a766fff21bb106142860"},{url:"/_next/static/media/d70c23d6fe66d464-s.woff2",revision:"7abbd25026a8e3994d885bd8704b9588"},{url:"/_next/static/media/dba81c1208da12ee-s.p.woff2",revision:"61ad024295cbcb211b4fda1d44905bf9"},{url:"/android-icon-192x192.ico",revision:"3522f6114029893bc7adc5421a8c6e95"},{url:"/avatar.png",revision:"b1e48274eb64a241e89ad52fb47e361f"},{url:"/cover.jpg",revision:"6a4de244968766fb41290e52f82aa5d9"},{url:"/dumpservices.svg",revision:"eeb91c3a1b9cc194f6a78ae711c990eb"},{url:"/favicons/android-icon-144x144.png",revision:"f84c22abbaf2104f0a15e5fa7ce57b00"},{url:"/favicons/android-icon-192x192.png",revision:"511bcb417298d5c1213764a36560b32f"},{url:"/favicons/android-icon-36x36.png",revision:"29c6d2e5a169c485bd3c9ff8d507d06a"},{url:"/favicons/android-icon-48x48.png",revision:"ac8a9ab09e2ad7a4a83a8242e368d955"},{url:"/favicons/android-icon-72x72.png",revision:"1558ca8274579e2ec3de8656b4fdbadc"},{url:"/favicons/android-icon-96x96.png",revision:"087c1fefc4d8c3405ed3f190fde66488"},{url:"/favicons/apple-icon-114x114.png",revision:"636830f827e5ef6a7e311ecb194724e8"},{url:"/favicons/apple-icon-120x120.png",revision:"927c6b82f4a9b24625a71f2af0d573c3"},{url:"/favicons/apple-icon-144x144.png",revision:"3e450ed21f08e365988e1b4204741414"},{url:"/favicons/apple-icon-152x152.png",revision:"9679a0904a815021bcc077c896745035"},{url:"/favicons/apple-icon-180x180.png",revision:"3c2ff5ee3103cde01363264bdfb5af30"},{url:"/favicons/apple-icon-57x57.png",revision:"e7263b5f6cffc2f8b5eaacb3d1cb923e"},{url:"/favicons/apple-icon-60x60.png",revision:"4f8dd5b7c43677ad0d0280fb2da2c717"},{url:"/favicons/apple-icon-72x72.png",revision:"553485edb24f1d2dff0475d7cfaaa179"},{url:"/favicons/apple-icon-76x76.png",revision:"1a2296d1b48a640ac2573c943afd4521"},{url:"/favicons/apple-icon-precomposed.png",revision:"a5e9655fc315dac613db287d4c8e1b76"},{url:"/favicons/apple-icon.png",revision:"a5e9655fc315dac613db287d4c8e1b76"},{url:"/favicons/browserconfig.xml",revision:"653d077300a12f09a69caeea7a8947f8"},{url:"/favicons/favicon-16x16.png",revision:"5b3a238a137b1131203647aa86566db6"},{url:"/favicons/favicon-32x32.png",revision:"23b4db369271952e5181e4821a4110d2"},{url:"/favicons/favicon-96x96.png",revision:"f28206c4fd55681bc94f5eb988754213"},{url:"/favicons/favicon.ico",revision:"4cdcbe3ad9c6ebe78cdc084448c06753"},{url:"/favicons/favicon.svg",revision:"6d222efc790057eab4b7861734a9b7c1"},{url:"/favicons/manifest.json",revision:"cedc58bb031b4647806e1dedaffee50e"},{url:"/favicons/migratooor.png",revision:"c4b113e92e2bb184bc38d51d155fbe9a"},{url:"/favicons/ms-icon-144x144.png",revision:"3e450ed21f08e365988e1b4204741414"},{url:"/favicons/ms-icon-150x150.png",revision:"b8562b84bdb01e15ac2a9da77851f7d0"},{url:"/favicons/ms-icon-310x310.png",revision:"11d6296e7dd481a314efc70319b0bd2c"},{url:"/favicons/ms-icon-70x70.png",revision:"3f0ee0a51145090f43afd16ae01f7023"},{url:"/hero.jpg",revision:"cf79e58bc70764bb684a3def9adce41f"},{url:"/manifest.json",revision:"a9d80e671daa9979af521321d9b72d32"},{url:"/og.png",revision:"6db3b275535fd4ca1668a70b9695c519"},{url:"/og_disperse.png",revision:"784c32d2acff860ebe51ee8120f0ffa5"},{url:"/og_migratooor.png",revision:"f1a18c476bb8dade1a82cd8bea7af5ac"},{url:"/og_multisafe.png",revision:"326c84f0a57cb17ecaef9a53f754afe9"},{url:"/og_tokenlistooor.png",revision:"4ffbb2ea6468d9045af942d00465cd9a"},{url:"/placeholder-nft.png",revision:"0a5319ce91d205bd2dbbeb5de2d1dcaa"},{url:"/placeholder.png",revision:"76e4abc63869962750bcd60694719807"},{url:"/token-placeholder.png",revision:"63a4606fa310d550bd5b87e2ffc64658"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
