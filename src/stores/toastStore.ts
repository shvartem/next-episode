import {createStore} from 'zustand/vanilla';

export type ToastTone = 'neutral' | 'success' | 'warning';

interface Toast {
    message: string;
    tone: ToastTone;
}

export const toastStore = createStore<{toast: Toast | null}>(() => ({toast: null}));
