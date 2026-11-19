import clsx from 'clsx';

import type {Props} from './types';
import {TvShowCard} from './TvShowCard/TvShowCard';

import styles from './TvShowsList.module.css';

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
