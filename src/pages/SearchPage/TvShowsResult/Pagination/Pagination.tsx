import clsx from 'clsx';

import styles from './Pagination.module.css';

interface Props {
    className?: string;
    page: number;
    pagesCount: number;
    onChange: (page: number) => void;
}

export const Pagination = (props: Props) => {
    const {className, page, pagesCount, onChange} = props;

    if (pagesCount <= 1) {
        return null;
    }

    const pages = Array.from({length: pagesCount}, (_, index) => index + 1);

    return (
        <nav className={clsx(styles.root, className)} aria-label="Pagination">
            <button
                className={styles.button}
                type="button"
                onClick={() => onChange(page - 1)}
                disabled={page === 1}
            >
                Previous
            </button>

            <ol className={styles.pages}>
                {pages.map((item) => (
                    <li key={item}>
                        <button
                            className={clsx(styles.button, styles.page, item === page && styles.current)}
                            type="button"
                            onClick={() => onChange(item)}
                            aria-current={item === page ? 'page' : undefined}
                            aria-label={`Page ${item}`}
                        >
                            {item}
                        </button>
                    </li>
                ))}
            </ol>

            <button
                className={styles.button}
                type="button"
                onClick={() => onChange(page + 1)}
                disabled={page === pagesCount}
            >
                Next
            </button>
        </nav>
    );
};
