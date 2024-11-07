import React from 'react';
import {IconSpinner} from '@/app/components/icons/IconSpinner';

export default function Loading(): React.ReactElement {
	return (
		<div className={'flex h-full w-full items-center justify-center'}>
			<IconSpinner className={'h-8 w-8'} />
		</div>
	);
}
