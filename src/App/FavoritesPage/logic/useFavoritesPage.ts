import {useFavoritesList} from '../../RootLayout/logic/useFavorites';

export const useFavoritesPage = () => {
    const favorites = useFavoritesList();

    return {...favorites, hasFavorites: favorites.items.length > 0};
};
