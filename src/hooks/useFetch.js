import { useEffect, useState } from 'react';

export const useFetch = (initialUrl) => {
	const [url, setUrl] = useState(initialUrl);
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(undefined);

	const fetchData = async (url) => {
		setIsLoading(true);
		setError(undefined);

		try {
			const response = await fetch(url);

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const result = await response.json();
			setData(result);
		} catch (error) {
			setError(error.messege);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData(url);
	}, [url]);

	const refetch = ({ params }) => {
		const newUrl = `${initialUrl}?${new URLSearchParams(params).toString()}`;
		setUrl(newUrl);
	};

	return { data, isLoading, error, refetch };
};
