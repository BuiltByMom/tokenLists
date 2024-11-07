import React from 'react';
import Link from 'next/link';

import Button from '@/app/components/Button';

export default function NotFound(): React.ReactElement {
	return (
		<div className={'flex size-full flex-col items-center justify-center gap-6'}>
			<div className={'text-center'}>
				<h2 className={'text-2xl font-bold'}>{'Not Found'}</h2>
				<p className={'text-neutral-600'}>{'Could not find requested resource'}</p>
			</div>
			<Link href={'/'}>
				<Button>{'Return Home'}</Button>
			</Link>
		</div>
	);
}
