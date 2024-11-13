import {LayoutGrid, LayoutList} from 'lucide-react';

import Button from './Button';

import type {ReactElement} from 'react';

type TViewMode = 'grid' | 'list';

type TViewToggleProps = {
	currentView: TViewMode;
	onViewChange: (view: TViewMode) => void;
};

export function ViewToggle({currentView, onViewChange}: TViewToggleProps): ReactElement {
	return (
		<div className={'-mt-4 flex gap-1 pl-4'}>
			<Button
				className={'!h-8 border border-neutral-300 bg-neutral-0 !px-4'}
				variant={'ligth'}
				onClick={() => onViewChange(currentView === 'grid' ? 'list' : 'grid')}>
				{currentView === 'grid' ? <LayoutGrid className={'size-4'} /> : <LayoutList className={'size-4'} />}
			</Button>
		</div>
	);
}
