import { useMemo, useState } from 'react';
import { useWindowEvent } from './useWindowEvent';

export const useViewportSize = () => {
	const [height, setHeight] = useState<number>(window.innerHeight);
	const [width, setWidth] = useState<number>(window.innerWidth);

	useWindowEvent('resize', () => {
		setHeight(window.innerHeight);
		setWidth(window.innerWidth);
	});

	return { height, width };
};
