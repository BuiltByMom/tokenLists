'use client';

import React from 'react';
import {SWRConfig} from 'swr';

export function Providers({children}: {children: React.ReactNode}) {
	return (
		<SWRConfig
			value={{
				fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
			}}>
			{children}
		</SWRConfig>
	);
}
