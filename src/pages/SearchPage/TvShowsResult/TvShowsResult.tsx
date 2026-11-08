import clsx from 'clsx';
import type {TvShow} from '../../../api/types';
import {EmptyList} from './EmptyList/EmptyList';
import {TvShowsList} from './TvShowsList/TvShowsList';

import styles from './TvShowsResult.module.css';

interface Props {
    className?: string;
    list: TvShow[];
}

export const TvShowsResult = (props: Props) => {
    const {className, list} = props;

    return (
        <div className={clsx(styles.root, className)}>
            {!list.length && <EmptyList />}

            {!!list.length && <TvShowsList list={list} />}
        </div>
    );
};
