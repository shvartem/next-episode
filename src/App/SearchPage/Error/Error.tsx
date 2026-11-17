import clsx from 'clsx';

import type {Props} from './types';

import styles from './Error.module.css';

export const Error = (props: Props) => {
    const {className, error} = props;

    return (
        <div className={clsx(styles.root, className)} role="alert">
            <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7.5v5.5" />
                <path d="M12 16.5v.01" />
            </svg>

            <div className={styles.content}>
                <h2 className={styles.title}>Something went wrong</h2>
                <p className={styles.message}>{error}</p>
            </div>
        </div>
    );
};
