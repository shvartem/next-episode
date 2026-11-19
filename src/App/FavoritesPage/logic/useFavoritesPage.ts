import {useFavorites} from '~/App/favorites/FavoritesContext';

export const useFavoritesPage = () => {
    const {favorites, loadFailed, reload} = useFavorites();

    return {
        items: favorites?.items ?? [],
        hasFavorites: Boolean(favorites?.count),
        isLoading: !favorites && !loadFailed,
        loadFailed,
        reload,
    };
};
