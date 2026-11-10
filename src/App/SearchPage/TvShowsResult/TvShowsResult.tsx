import clsx from 'clsx';

import type {Props} from './types';
import {EmptyList} from './EmptyList/EmptyList';
import {GenreFilter} from './GenreFilter/GenreFilter';
import {TvShowsList} from './TvShowsList/TvShowsList';
import {Pagination} from './Pagination/Pagination';
import {useTvShowsResultPresenter} from './useTvShowsResultPresenter';

import styles from './TvShowsResult.module.css';

export const TvShowsResult = (props: Props) => {
    const {className} = props;

    const {hasList, totalCount, genres, selectedGenre, handleGenreChange, page, pageItems, pagesCount, setPage} =
        useTvShowsResultPresenter(props);

    return (
        <div className={clsx(styles.root, className)}>
            {!hasList && <EmptyList />}

            {hasList && (
                <>
                    <GenreFilter
                        genres={genres}
                        totalCount={totalCount}
                        selectedGenre={selectedGenre}
                        onChange={handleGenreChange}
                    />

                    <TvShowsList list={pageItems} />

                    <Pagination page={page} pagesCount={pagesCount} onChange={setPage} />
                </>
            )}
        </div>
    );
};
