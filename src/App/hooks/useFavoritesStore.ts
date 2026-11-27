import {favoritesStore, type FavoritesState} from '~/stores/favoritesStore';
import {useExternalStore} from './useExternalStore';

export const useFavoritesStore = <Selected>(selector: (state: FavoritesState) => Selected) =>
    useExternalStore(favoritesStore, selector);
