import React from 'react';
import { useFetch, useHover, useLocalStorage, useViewportSize } from './hooks';

const URL: string = 'https://jsonplaceholder.typicode.com/posts';

type IDemoProps = {
	url: string;
};

const Demo1: React.FC<IDemoProps> = ({ url }) => {
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

const Demo2: React.FC = () => {
	const [value, { setItem, removeItem }] = useLocalStorage('some-key');

	return (
		<div>
			<p>Значение из LocalStorage: {value}</p>
			<div>
				<button onClick={() => setItem('new storage value')}>
					Задать значение
				</button>
				<button onClick={() => removeItem()}>Удалить значение</button>
			</div>
		</div>
	);
};

const Demo3: React.FC = () => {
	const { hovered, ref } = useHover();

	return (
		<div ref={ref} style={{ cursor: `pointer` }}>
			{hovered ? 'На меня навели мышку' : 'Наведи мышкой на меня'}
		</div>
	);
};

const Demo4: React.FC = () => {
	const { height, width } = useViewportSize();

	return (
		<>
			<div>Width: {width}</div>
			<div>Height: {height}</div>
		</>
	);
};

export const App = () => {
	return (
		<>
			<Demo1 url={URL} />
			{/* <Demo2/> */}
			{/* <Demo3 /> */}
			{/* <Demo4 /> */}
		</>
	);
};
