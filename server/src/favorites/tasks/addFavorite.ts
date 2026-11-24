import type {Show} from '../../../../shared/shows.ts';
import {favoritesStore} from '../favoritesStore.ts';

export async function addFavorite(
    ownerId: string,
    showId: number,
    loadShow: (showId: number) => Promise<Show | null>,
) {
    const existing = favoritesStore.get(ownerId, showId);

    if (existing) {
        return {item: existing, created: false};
    }

    const show = await loadShow(showId);

    return show === null ? null : favoritesStore.add(ownerId, show);
}
