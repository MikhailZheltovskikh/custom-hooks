import React from 'react';
import { useFetch, useLocalStorage,  } from './hooks';

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

const Demo1: React.FC<IDemoProps> = ({ url }) => {
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

const Demo2 = () => {
	const [value, { setItem, removeItem }] = useLocalStorage('some-key');

	return (
	  <div>
		<p>Значение из LocalStorage: {value}</p>
		<div>
		  <button onClick={() => setItem('new storage value')}>Задать значение</button>
		  <button onClick={() => removeItem()}>Удалить значение</button>
		</div>
	  </div>
	);
  }

export const App = () => {
	return (
		<>
			<Demo1 url={URL} />
			<Demo2/>
		</>
	);
};
