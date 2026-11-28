import {SearchFavoriteButton} from './SearchFavoriteButton/SearchFavoriteButton';
import {TvShowCard} from '../components/TvShowCard/TvShowCard';
import {TvShowsCollection} from '../components/TvShowsCollection/TvShowsCollection';
import {EmptyList} from './EmptyList/EmptyList';
import {GenreFilter} from './GenreFilter/GenreFilter';
import {Pagination} from './Pagination/Pagination';
import {SearchForm} from './SearchForm/SearchForm';
import {Loader} from './Loader/Loader';
import {Error} from './Error/Error';
import {useSearchPage} from './logic/useSearchPage';

import styles from './SearchPage.module.css';

export const SearchPage = () => {
    const {
        search, error, isLoading, result, hasMatches, searchHint, selectedGenre, handleSearch, handleGenreChange, handlePageChange,
        onFavoriteClick,
    } = useSearchPage();

    const renderContent = () => {
        if (isLoading) {
            return <Loader />;
        }

        if (error) {
            return <Error error={error} />;
        }

        if (result) {
            return (
                <TvShowsCollection
                    className={styles.results}
                    list={result.items}
                    controls={hasMatches && (
                        <GenreFilter
                            genres={result.genres}
                            totalCount={result.totalCount}
                            selectedGenre={selectedGenre}
                            onChange={handleGenreChange}
                        />
                    )}
                    emptyState={<EmptyList />}
                    pagination={<Pagination page={result.page} pagesCount={result.pagesCount} onChange={handlePageChange} />}
                    renderCard={(show) => (
                        <TvShowCard
                            card={show}
                            favoriteAction={<SearchFavoriteButton show={show} onClick={onFavoriteClick} />}
                        />
                    )}
                />
            );
        }

        return null;
    };

    return (
        <div>
            <h1 className={styles.title}>Search Page</h1>
            <SearchForm search={search} hint={searchHint} onChange={handleSearch} />
            {renderContent()}
        </div>
    );
};
