import {toastStore, type ToastState} from '~/stores/toastStore';
import {useExternalStore} from './useExternalStore';

export const useToastStore = <Selected>(selector: (state: ToastState) => Selected) =>
    useExternalStore(toastStore, selector);
