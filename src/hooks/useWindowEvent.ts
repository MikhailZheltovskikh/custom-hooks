import { useEffect } from 'react';

export function useWindowEvent(type: string, listener: () => void): void {
	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener(type, listener);
			return () => window.removeEventListener(type, listener);
		}
	}, [type, listener]);
}
