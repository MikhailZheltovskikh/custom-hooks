import React from 'react';
import { useFetch } from './hooks';

const URL: string = 'https://jsonplaceholder.typicode.com/posts';

interface IDemoProps {
	url: string;
}

interface IPosts {
	id: number;
	title: string;
}

interface IFetch {
	data: IPosts[] | null;
	isLoading: boolean;
	error: string | undefined;
	refetch: (params) => void;
}

const Demo: React.FC<IDemoProps> = ({ url }) => {
	const { data, isLoading, error, refetch }: IFetch = useFetch(url);

	return (
		<div>
			<div>
				<button
					onClick={() =>
						refetch({
							params: {
								_limit: 3,
							},
						})
					}
				>
					Перезапросить
				</button>
			</div>
			{isLoading && 'Загрузка...'}
			{error && 'Произошла ошибка'}
			{data &&
				!isLoading &&
				data.map((item) => <div key={item.id}>{item.title}</div>)}
		</div>
	);
};

export const App: React.FC = () => {
	return (
		<>
			<Demo url={URL} />
		</>
	);
};
