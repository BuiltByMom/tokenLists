import {IconSpinner} from '@/app/components/icons/IconSpinner';

export default function Loading(): React.ReactElement {
	return (
		<div className={'flex size-full items-center justify-center'}>
			<IconSpinner className={'size-8'} />
		</div>
	);
}
