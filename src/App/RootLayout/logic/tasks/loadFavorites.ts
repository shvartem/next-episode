import {favoritesRepository} from '~/api';
import {favoritesStore} from '~/stores/favoritesStore';

let pending: Promise<void> | undefined;

export function loadFavorites() {
    if (favoritesStore.getState().items !== null) return;
    pending ??= favoritesRepository.getFavorites().then(({items}) => {
        favoritesStore.setState({items, loadFailed: false});
    }).catch(() => {
        favoritesStore.setState({loadFailed: true});
    }).finally(() => { pending = undefined; });

    return pending;
}
