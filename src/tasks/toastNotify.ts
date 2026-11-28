import {toastStore} from '~/stores/toastStore';
import type {ToastTone} from '~/stores/toastStore';

export function toastNotify(message: string, durationMs: number, tone: ToastTone = 'neutral'): void {
    const toast = {message, tone};
    toastStore.setState({toast});

    setTimeout(() => {
        if (toastStore.getState().toast === toast) {
            toastStore.setState({toast: null});
        }
    }, durationMs);
}
