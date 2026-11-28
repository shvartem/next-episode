import {favoritesRepository} from '~/api';
import {favoritesStore} from '~/stores/favoritesStore';
import {sessionStore} from '~/stores/sessionStore';

export async function loadFavorites(token: string, signal: AbortSignal) {
    const isCurrentSession = () => !signal.aborted && sessionStore.getState().session?.token === token;

    try {
        const {items} = await favoritesRepository.getFavorites(token, signal);

        if (isCurrentSession()) {
            favoritesStore.setState({items, loadFailed: false});
        }
    } catch {
        if (isCurrentSession()) {
            favoritesStore.setState({loadFailed: true});
        }
    }
}
