import {useEffect, useRef, useState} from 'react';

export const useDebounce = <T>(value: T, delay: number) => {
    const [debounced, setDebounced] = useState<T>(value);
    const timerRef = useRef<number>(null);

    useEffect(() => {
        timerRef.current = setTimeout(() => {
            setDebounced(value);
        }, delay);

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [value, delay]);

    return debounced;
};
