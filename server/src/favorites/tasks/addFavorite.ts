import type {Show} from '../../../../shared/shows.ts';
import {favoritesStore} from '../favoritesStore.ts';

export async function addFavorite(
    ownerId: string,
    showId: number,
    loadShow: (showId: number) => Promise<Show | null>,
) {
    if (!favoritesStore.has(ownerId, showId)) {
        const show = await loadShow(showId);
        if (show === null) return null;

        favoritesStore.add(ownerId, show);
    }

    return favoritesStore.list(ownerId);
}
