import {getTvMazeShow} from '../../tvmaze/getTvMazeShow.ts';
import {favoritesStore} from '../favoritesStore.ts';

export async function addFavorite(ownerId: string, showId: number) {
    const existing = favoritesStore.getCollection(ownerId)?.[showId];

    if (existing) {
        return {item: existing, created: false};
    }

    const show = await getTvMazeShow(showId);

    if (show === null) {
        return null;
    }

    // Пока шёл запрос к TVmaze, другой запрос мог изменить коллекцию пользователя.
    const collection = favoritesStore.getCollection(ownerId);
    const saved = collection?.[showId];

    if (saved) {
        return {item: saved, created: false};
    }

    favoritesStore.setCollection(ownerId, {...collection, [showId]: show});

    return {item: show, created: true};
}
