import {TvShowsList} from '../components/TvShowsList/TvShowsList';
import {useFavoritesPage} from './logic/useFavoritesPage';

import styles from './FavoritesPage.module.css';

export const FavoritesPage = () => {
    const {items, hasFavorites, isLoading, loadError} = useFavoritesPage();

    const renderContent = () => {
        if (isLoading) return <p role="status">Loading favorites…</p>;
        if (loadError) return <p role="alert">{loadError}</p>;
        if (!hasFavorites) return <p>No favorites yet.</p>;

        return <TvShowsList list={items} />;
    };

    return (
        <main className={styles.root}>
            <h1 className={styles.title}>Favorites</h1>
            {renderContent()}
        </main>
    );
};
