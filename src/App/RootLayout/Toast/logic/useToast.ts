import {useToastStore} from '~/App/hooks/useToastStore';

export const useToast = () => useToastStore((state) => state.toast);
