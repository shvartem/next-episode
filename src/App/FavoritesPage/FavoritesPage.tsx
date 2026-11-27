import {Link} from 'react-router';
import {FavoriteButton} from '../components/FavoriteButton/FavoriteButton';
import {TvShowCard} from '../components/TvShowCard/TvShowCard';
import {TvShowsList} from '../components/TvShowsList/TvShowsList';
import {useFavoritesPage} from './logic/useFavoritesPage';

import styles from './FavoritesPage.module.css';

export const FavoritesPage = () => {
    const {isLoggedIn, loginState, items, hasFavorites, isLoading, loadError, onFavoriteClick} = useFavoritesPage();

    const renderContent = () => {
        if (!isLoggedIn) {
            return (
                <p>
                    <Link to="/login" state={loginState}>Log in</Link> to see your favorites.
                </p>
            );
        }

        if (isLoading) {
            return <p role="status">Loading favorites…</p>;
        }

        if (loadError) {
            return <p role="alert">{loadError}</p>;
        }

        if (!hasFavorites) {
            return <p>No favorites yet.</p>;
        }

        return (
            <TvShowsList
                list={items}
                renderCard={(show) => (
                    <TvShowCard
                        card={show}
                        favoriteAction={<FavoriteButton show={show} onClick={onFavoriteClick} />}
                    />
                )}
            />
        );
    };

    return (
        <main className={styles.root}>
            <h1 className={styles.title}>Favorites</h1>
            {renderContent()}
        </main>
    );
};
