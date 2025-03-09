import React from 'react';
import { useFetch } from './hooks';

const URL = 'https://jsonplaceholder.typicode.com/posts';

const Demo = ({ url }) => {
	const { data, isLoading, error, refetch } = useFetch(url);

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

export const App = () => {
	return (
		<>
			<Demo url={URL} />
		</>
	);
};
