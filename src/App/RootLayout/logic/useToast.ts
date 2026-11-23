import {useEffect, useState} from 'react';

const TOAST_DURATION = 4000;

export const useToast = () => {
    const [toast, setToast] = useState<{message: string} | null>(null);

    useEffect(() => {
        if (!toast) return;

        const timeout = setTimeout(() => setToast(null), TOAST_DURATION);
        return () => clearTimeout(timeout);
    }, [toast]);

    const showToast = (message: string) => setToast({message});
    const clearToast = () => setToast(null);

    return {toastMessage: toast?.message, showToast, clearToast};
};
