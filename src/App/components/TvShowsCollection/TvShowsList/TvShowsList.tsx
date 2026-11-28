import clsx from 'clsx';

import type {Props} from './types';

import styles from './TvShowsList.module.css';

export const TvShowsList = (props: Props) => {
    const {className, list, renderCard} = props;

    return (
        <ol className={clsx(styles.root, className)}>
            {list.map((item) => (
                <li key={item.id}>
                    {renderCard(item)}
                </li>
            ))}
        </ol>
    );
};
