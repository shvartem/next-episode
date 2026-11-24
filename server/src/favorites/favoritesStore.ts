import type {Show} from '../../../shared/shows.ts';

const favorite: Partial<Record<string, Record<number, Show>>> = Object.create(null);

export const favoritesStore = {
    list(ownerId: string): Show[] {
        const collection = favorite[ownerId];

        return collection ? Object.values(collection) : [];
    },

    get(ownerId: string, showId: number): Show | undefined {
        return favorite[ownerId]?.[showId];
    },

    add(ownerId: string, show: Show): {item: Show; created: boolean} {
        const existing = favorite[ownerId]?.[show.id];

        if (existing) {
            return {item: existing, created: false};
        }

        const collection = favorite[ownerId] ??= Object.create(null);
        collection[show.id] = show;

        return {item: show, created: true};
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
