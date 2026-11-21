import clsx from 'clsx';

import type {Props} from './types';
import {EmptyList} from './EmptyList/EmptyList';
import {GenreFilter} from './GenreFilter/GenreFilter';
import {TvShowsList} from './TvShowsList/TvShowsList';
import {Pagination} from './Pagination/Pagination';

import styles from './TvShowsResult.module.css';

export const TvShowsResult = (props: Props) => {
    const {className, result, selectedGenre, onGenreChange, onPageChange} = props;

    const {totalCount, genres, page, items, pagesCount} = result;

    return (
        <div className={clsx(styles.root, className)}>
            {totalCount === 0 && <EmptyList />}

            {totalCount > 0 && (
                <>
                    <GenreFilter
                        genres={genres}
                        totalCount={totalCount}
                        selectedGenre={selectedGenre}
                        onChange={onGenreChange}
                    />

                    <TvShowsList list={items} />

                    <Pagination page={page} pagesCount={pagesCount} onChange={onPageChange} />
                </>
            )}
        </div>
    );
};
