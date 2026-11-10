import clsx from 'clsx';

import type {Props} from './types';
import {usePaginationPresenter} from './usePaginationPresenter';

import styles from './Pagination.module.css';

export const Pagination = (props: Props) => {
    const {className} = props;

    const {isVisible, pages, isFirst, isLast, handlePrevious, handleNext} = usePaginationPresenter(props);

    if (!isVisible) {
        return null;
    }

    return (
        <nav className={clsx(styles.root, className)} aria-label="Pagination">
            <button className={styles.button} type="button" onClick={handlePrevious} disabled={isFirst}>
                Previous
            </button>

            <ol className={styles.pages}>
                {pages.map((item) => (
                    <li key={item.value}>
                        <button
                            className={clsx(styles.button, styles.page, item.isCurrent && styles.current)}
                            type="button"
                            onClick={item.handleClick}
                            aria-current={item.isCurrent ? 'page' : undefined}
                            aria-label={`Page ${item.value}`}
                        >
                            {item.value}
                        </button>
                    </li>
                ))}
            </ol>

            <button className={styles.button} type="button" onClick={handleNext} disabled={isLast}>
                Next
            </button>
        </nav>
    );
};
