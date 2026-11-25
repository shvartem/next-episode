import clsx from 'clsx';

import type {Props} from './types';
import {EmptyList} from './EmptyList/EmptyList';
import {GenreFilter} from './GenreFilter/GenreFilter';
import {TvShowCard} from '../../components/TvShowCard/TvShowCard';
import {TvShowsList} from '../../components/TvShowsList/TvShowsList';
import {Pagination} from './Pagination/Pagination';
import {useTvShowsResult} from './logic/useTvShowsResult';

import styles from './TvShowsResult.module.css';

export const TvShowsResult = (props: Props) => {
    const {className, selectedGenre, onGenreChange, onPageChange} = props;

    const {totalCount, genres, page, items, pagesCount, hasMatches, hasItems, onFavoriteClick} = useTvShowsResult(props);

    return (
        <div className={clsx(styles.root, className)}>
            {hasMatches && (
                <GenreFilter
                    genres={genres}
                    totalCount={totalCount}
                    selectedGenre={selectedGenre}
                    onChange={onGenreChange}
                />
            )}

            {hasItems ? (
                <>
                    <TvShowsList list={items} renderCard={(show) => <TvShowCard card={show} onFavoriteClick={onFavoriteClick} />} />
                    <Pagination page={page} pagesCount={pagesCount} onChange={onPageChange} />
                </>
            ) : (
                <EmptyList />
            )}
        </div>
    );
};
