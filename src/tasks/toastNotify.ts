import {toastStore} from '~/stores/toastStore';

export function toastNotify(message: string, durationMs: number): void {
    const toast = {message};
    toastStore.setState({toast});

    setTimeout(() => {
        if (toastStore.getState().toast === toast) toastStore.setState({toast: null});
    }, durationMs);
}
