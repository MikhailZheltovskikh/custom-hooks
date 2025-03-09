import { useEffect, useState } from 'react';

interface IPosts {
	id: number;
	title: string;
}

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

	const refetch = ({ params }) => {
		const newUrl: string = `${initialUrl}?${new URLSearchParams(params).toString()}`;
		setUrl(newUrl);
	};

	return { data, isLoading, error, refetch };
};
