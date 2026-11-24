import {createStore} from 'zustand/vanilla';

export const toastStore = createStore<{toast: {message: string} | null}>(() => ({toast: null}));
