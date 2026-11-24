import type {Show} from '../../../shared/shows.ts';

const favorite: Partial<Record<string, Record<number, Show>>> = Object.create(null);

export const favoritesStore = {
    list(ownerId: string): Show[] {
        const collection = favorite[ownerId];

        return collection ? Object.values(collection) : [];
    },

    has(ownerId: string, showId: number): boolean {
        return favorite[ownerId]?.[showId] !== undefined;
    },

    add(ownerId: string, show: Show): void {
        const collection = favorite[ownerId] ??= Object.create(null);
        collection[show.id] ??= show;
    },

    remove(ownerId: string, showId: number): void {
        const collection = favorite[ownerId];

        if (!collection) {
            return;
        }

        delete collection[showId];

        if (Object.keys(collection).length === 0) {
            delete favorite[ownerId];
        }
    },
};
