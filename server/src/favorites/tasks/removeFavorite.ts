import {favoritesStore} from '../favoritesStore.ts';

export function removeFavorite(ownerId: string, showId: number) {
    favoritesStore.remove(ownerId, showId);
}
