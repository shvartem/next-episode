import {useFavorites} from '~/App/favorites/FavoritesContext';

export const useRootLayoutContent = () => {
    const {favorites} = useFavorites();

    return {
        favoritesLabel: favorites ? `Favorites (${favorites.count})` : 'Favorites',
    };
};
