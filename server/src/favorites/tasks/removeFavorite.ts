import {favoritesStore} from '../favoritesStore.ts';

export function removeFavorite(ownerId: string, showId: number): void {
    const collection = favoritesStore.getCollection(ownerId);

    if (!collection) {
        return;
    }

    const remaining = {...collection};

    delete remaining[showId];

    favoritesStore.setCollection(ownerId, Object.keys(remaining).length > 0 ? remaining : undefined);
}
