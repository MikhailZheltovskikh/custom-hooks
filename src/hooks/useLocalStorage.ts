import { useState } from 'react';

type LocalStorageSetValue = string;
type LocalStorageReturnValue = LocalStorageSetValue | null;

type UseLocalStorage = (key: string) => [
	value: LocalStorageReturnValue,
	{
		setItem: (value: LocalStorageSetValue) => void;
		removeItem: () => void;
	},
];

export const useLocalStorage: UseLocalStorage = (key) => {
	const [value, setValue] = useState<LocalStorageReturnValue>(() => {
		const storedValue = localStorage.getItem(key);
		return storedValue ? storedValue : null;
	});

	const setItem = (newValue: LocalStorageSetValue) => {
		setValue(newValue);
		localStorage.setItem(key, newValue);
	};

	const removeItem = () => {
		setValue(null);
		localStorage.removeItem(key);
	};

	return [value, { setItem, removeItem }];
};
