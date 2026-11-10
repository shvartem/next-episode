import styles from './SearchPage.module.css';
import {TvShowsResult} from './TvShowsResult/TvShowsResult';
import {SearchForm} from './SearchForm/SearchForm';
import {Loader} from './Loader/Loader';
import {Error} from './Error/Error';
import {useSearchPage} from './useSearchPage';

function SearchPage() {
    const {error, isLoading, tvShowsList, searchHint, handleSearch} = useSearchPage();

    const renderContent = () => {
        if (isLoading) {
            return <Loader />;
        }

        if (error) {
            return <Error error={error} />;
        }

        if (tvShowsList) {
            return <TvShowsResult list={tvShowsList} />;
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
}

export default SearchPage;
