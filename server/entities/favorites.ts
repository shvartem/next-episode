import type {Favorites} from '#shared/favorites';
import type {TvShow} from '#shared/shows';

const favorite = new Map<number, TvShow>();

export const getFavorites = (): Favorites => {
    const items = [...favorite.values()].sort((a, b) => a.show.id - b.show.id);
    return {items, count: favorite.size};
};

export const getFavorite = (id: number) => favorite.get(id);

export const saveFavorite = (item: TvShow) => {
    const id = item.show.id;
    const existing = getFavorite(id);
    if (existing) {
        return {item: existing, created: false};
    }

    favorite.set(id, item);
    return {item, created: true};
};

export const deleteFavorite = (id: number) => {
    favorite.delete(id);
};
