import {deleteFavorite} from '../../entities/favorites.ts';

export const removeFavorite = (id: number) => {
    deleteFavorite(id);
};
