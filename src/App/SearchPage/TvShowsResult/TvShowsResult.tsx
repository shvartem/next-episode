import clsx from 'clsx';

import type {Props} from './types';
import {EmptyList} from './EmptyList/EmptyList';
import {GenreFilter} from './GenreFilter/GenreFilter';
import {TvShowsList} from '../../components/TvShowsList/TvShowsList';
import {Pagination} from './Pagination/Pagination';
import {useTvShowsResult} from './logic/useTvShowsResult';

import styles from './TvShowsResult.module.css';

export const TvShowsResult = (props: Props) => {
    const {className, result, selectedGenre, onGenreChange, onPageChange} = props;
    const {unfilteredCount, genres, page, items, pagesCount} = result;
    const {hasGenres, isEmpty} = useTvShowsResult(props);

    return (
        <div className={clsx(styles.root, className)}>
            {hasGenres && (
                <GenreFilter
                    genres={genres}
                    totalCount={unfilteredCount}
                    selectedGenre={selectedGenre}
                    onChange={onGenreChange}
                />
            )}

            {isEmpty ? <EmptyList /> : <TvShowsList list={items} />}

            <Pagination page={page} pagesCount={pagesCount} onChange={onPageChange} />
        </div>
    );
};
