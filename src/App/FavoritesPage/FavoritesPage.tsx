import {TvShowsList} from '../components/TvShowsList/TvShowsList';
import {useFavoritesPage} from './logic/useFavoritesPage';

export const FavoritesPage = () => {
    const {items, hasFavorites, isLoading, loadFailed, reload} = useFavoritesPage();

    const renderContent = () => {
        if (isLoading) {
            return <p role="status">Loading favorites…</p>;
        }

        if (loadFailed) {
            return (
                <div>
                    <p role="alert">Could not load favorites.</p>
                    <button type="button" onClick={reload}>Try again</button>
                </div>
            );
        }

        if (hasFavorites) {
            return <TvShowsList list={items} />;
        }

        return <p>No favorite shows yet.</p>;
    };

    return (
        <section>
            <h1>Favorite shows</h1>
            {renderContent()}
        </section>
    );
};
