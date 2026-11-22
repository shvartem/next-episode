import {favoritesStore} from '../favoritesStore.ts';

export function getFavorites(ownerId: string) {
    return favoritesStore.list(ownerId);
}
