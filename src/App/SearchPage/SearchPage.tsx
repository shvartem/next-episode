import {TvShowsResult} from './TvShowsResult/TvShowsResult';
import {SearchForm} from './SearchForm/SearchForm';
import {Loader} from './Loader/Loader';
import {Error} from './Error/Error';
import {useSearchPage} from './logic/useSearchPage';

import styles from './SearchPage.module.css';

export const SearchPage = () => {
    const {
        error, isLoading, result, selectedGenre, searchHint, handleSearch, handleGenreChange, handlePageChange,
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
                <TvShowsResult
                    result={result}
                    selectedGenre={selectedGenre}
                    onGenreChange={handleGenreChange}
                    onPageChange={handlePageChange}
                />
            );
        }

        return null;
    };

    return (
        <div>
            <h1 className={styles.title}>Search Page</h1>

            <SearchForm hint={searchHint} onSubmit={handleSearch} />

            {renderContent()}
        </div>
    );
};
