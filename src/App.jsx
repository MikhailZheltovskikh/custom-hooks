import React from 'react';
import { useFetch, useLocalStorage,  } from './hooks';

const URL = 'https://jsonplaceholder.typicode.com/posts';

const Demo1 = ({ url }) => {
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
