import {createStore} from 'zustand/vanilla';

export type ToastTone = 'neutral' | 'success' | 'warning';

interface Toast {
    message: string;
    tone: ToastTone;
}

export interface ToastState {
    toast: Toast | null;
}

export const toastStore = createStore<ToastState>(() => ({toast: null}));
