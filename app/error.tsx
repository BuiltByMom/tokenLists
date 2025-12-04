'use client';

import Button from '@/app/components/Button';

export default function Error({
	error,
	reset
}: {
	error: Error & {digest?: string};
	reset: () => void;
}): React.ReactElement {
	return (
		<div className={'flex size-full flex-col items-center justify-center gap-6'}>
			<div className={'text-center'}>
				<h2 className={'text-2xl font-bold'}>{'Something went wrong!'}</h2>
				<p className={'text-neutral-600'}>{error.message}</p>
			</div>
			<Button onClick={reset}>{'Try again'}</Button>
		</div>
	);
}
