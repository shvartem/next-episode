import {getFavorite, saveFavorite} from '../../entities/favorites.ts';
import {getTvmazeShow} from '../../tvmaze.ts';

export const addFavorite = async (id: number) => {
    const existing = getFavorite(id);
    if (existing) {
        return {item: existing, created: false};
    }

    const show = await getTvmazeShow(id);
    return saveFavorite({score: 0, show});
};
