'use client';

import {toast} from 'react-hot-toast';
import {useDownloadFile} from 'hooks/useDownloadFile';
import axios from 'axios';

import type {AxiosResponse} from 'axios';
import type {ReactElement} from 'react';
import type {TAddress} from '@builtbymom/web3/types';

import {IconDownload} from '@/app/components/icons/IconDownload';

export type TDownloadAssetButtonProps = {
	chainId: number;
	address: TAddress;
	type: 'png' | 'svg';
	onSuccess?: () => void;
	fileName?: string;
};

export function DownloadAssetButton({
	address,
	type,
	chainId,
	fileName,
	onSuccess
}: TDownloadAssetButtonProps): ReactElement {
	const downloadFile = async (): Promise<AxiosResponse<Blob>> => {
		const url = `https://raw.githubusercontent.com/SmolDapp/tokenAssets/main/tokens/${chainId}/${address.toLowerCase()}/${
			type === 'png' ? 'logo-128.png' : 'logo.svg'
		}`;

		return axios.get(url, {
			responseType: 'blob'
		});
	};

	const {download} = useDownloadFile({
		apiDefinition: downloadFile,
		postDownloading: onSuccess,
		onError: () => toast.error('Something went wrong'),
		fileName,
		fileType: type
	});

	return (
		<button
			className={
				'bg-neutral-100 flex items-center gap-1 rounded-full px-2 py-1 transition-colors hover:bg-neutral-200'
			}
			onClick={download}>
			{type.toUpperCase()}
			<IconDownload />
		</button>
	);
}
