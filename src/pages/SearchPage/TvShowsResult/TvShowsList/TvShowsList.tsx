import clsx from 'clsx';

import {TvShowCard} from './TvShowCard/TvShowCard';
import type {TvShow} from '../../../../api/types';

import styles from './TvShowsList.module.css';

interface Props {
    className?: string;
    list: TvShow[];
}

export const TvShowsList = (props: Props) => {
    const {className, list} = props;

    return (
        <ol className={clsx(styles.root, className)}>
            {list.map((item) => (
                <li key={item.show.id}>
                    <TvShowCard card={item} />
                </li>
            ))}
        </ol>
    );
};
