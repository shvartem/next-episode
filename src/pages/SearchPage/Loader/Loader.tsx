import clsx from 'clsx';

import type {Props} from './types';

import styles from './Loader.module.css';

export const Loader = (props: Props) => {
    const {className} = props;

    return (
        <div className={clsx(styles.root, className)} role="status">
            <span className={styles.spinner} aria-hidden="true" />
            <span>Loading...</span>
        </div>
    );
};
