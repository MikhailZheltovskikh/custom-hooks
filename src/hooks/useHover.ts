import { useEffect, useRef, useState } from 'react';

export const useHover = () => {
	const [hovered, setHovered] = useState<boolean>(false);
	const ref = useRef<HTMLDivElement | null>(null);

	const handleMouseEnter = () => setHovered(true);
	const handleMouseLeave = () => setHovered(false);

	useEffect(() => {
		const element = ref.current;

		if (element) {
			element.addEventListener('mouseenter', handleMouseEnter);
			element.addEventListener('mouseleave', handleMouseLeave);

			return () => {
				element.removeEventListener('mouseenter', handleMouseEnter);
				element.removeEventListener('mouseleave', handleMouseLeave);
			};
		}
	}, [ref]);

	return {
		hovered,
		ref,
	};
};
