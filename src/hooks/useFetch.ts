import { useEffect, useState } from 'react';

type IPosts = {
	id: number;
	title: string;
};

type Params = {
	_limit: number;
};

type IFetch = {
	data: IPosts[] | null;
	isLoading: boolean;
	error: string | undefined;
	refetch: (params: { params: Params }) => void;
};


export const useFetch = (initialUrl: string) => {
	const [url, setUrl] = useState<string>(initialUrl);
	const [data, setData] = useState<IPosts[] | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>(undefined);

	const fetchData = async (url: string) => {
		setIsLoading(true);
		setError(undefined);

		try {
			const response = await fetch(url);

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const result: IPosts[] = await response.json();
			setData(result);
		} catch (error) {
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData(url);
	}, [url]);

	type IrefetchProps = {
		params: Record<string, string | number>;
	};

	const refetch = ({ params }: IrefetchProps) => {
		const newUrl: string = `${initialUrl}?${new URLSearchParams(params as Record<string, string>).toString()}`;
		setUrl(newUrl);
	};

	return { data, isLoading, error, refetch };
};
