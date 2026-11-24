import {useStore} from 'zustand';
import {toastStore} from '~/stores/toastStore';

export const useToast = () => useStore(toastStore, state => state.toast?.message);
