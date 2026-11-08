import clsx from 'clsx';

import styles from './Loader.module.css';

interface Props {
    className?: string;
}

export const Loader = (props: Props) => {
    const {className} = props;

    return (
        <div className={clsx(styles.root, className)} role="status">
            <span className={styles.spinner} aria-hidden="true" />
            <span>Loading...</span>
        </div>
    );
};
