import clsx from 'clsx';
import type {TvShow} from '../../../api/types';
import {EmptyList} from './EmptyList/EmptyList';
import {TvShowsList} from './TvShowsList/TvShowsList';
import {Pagination} from './Pagination/Pagination';
import {useTvShowsResult} from './useTvShowsResult';

import styles from './TvShowsResult.module.css';

interface Props {
    className?: string;
    list: TvShow[];
}

export const TvShowsResult = (props: Props) => {
    const {className, ...restProps} = props;

    const {hasList, page, pageItems, pagesCount, setPage} = useTvShowsResult(restProps);

    return (
        <div className={clsx(styles.root, className)}>
            {!hasList && <EmptyList />}

            {hasList && (
                <>
                    <TvShowsList list={pageItems} />

                    <Pagination page={page} pagesCount={pagesCount} onChange={setPage} />
                </>
            )}
        </div>
    );
};
