import type {Show} from '../../../shared/shows.ts';

const favorite: Partial<Record<string, Record<number, Show>>> = {};

export const favoritesStore = {
    list(ownerId: string): Show[] {
        const collection = favorite[ownerId];
        return collection ? Object.values(collection) : [];
    },

    has(ownerId: string, showId: number): boolean {
        return favorite[ownerId]?.[showId] !== undefined;
    },

    add(ownerId: string, show: Show): void {
        const collection = favorite[ownerId] ??= {};
        collection[show.id] ??= show;
    },

    remove(ownerId: string, showId: number): void {
        const collection = favorite[ownerId];
        if (collection) delete collection[showId];
    },
};
