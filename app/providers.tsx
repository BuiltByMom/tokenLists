'use client';

import {SWRConfig} from 'swr';

import type {ReactElement} from 'react';

export function Providers({children}: {children: React.ReactNode}): ReactElement {
	return (
		<SWRConfig
			value={{
				fetcher: async (resource, init) => fetch(resource, init).then(async res => res.json())
			}}>
			{children}
		</SWRConfig>
	);
}
