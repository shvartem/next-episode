import type {Show} from '../../../shared/shows.ts';

type FavoriteCollection = Readonly<Partial<Record<number, Show>>>;

const favorites: Partial<Record<string, FavoriteCollection>> = Object.create(null);

export const favoritesStore = {
    getCollection(ownerId: string): FavoriteCollection | undefined {
        return favorites[ownerId];
    },

    setCollection(ownerId: string, collection: FavoriteCollection | undefined): void {
        if (collection === undefined) {
            delete favorites[ownerId];

            return;
        }

        favorites[ownerId] = collection;
    },
};
