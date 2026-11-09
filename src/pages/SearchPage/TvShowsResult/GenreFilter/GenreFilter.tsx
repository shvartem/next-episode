import clsx from 'clsx';

import type {GenreOption} from './types';
import {useGenreFilter} from './useGenreFilter';

import styles from './GenreFilter.module.css';

interface Props {
    className?: string;
    genres: GenreOption[];
    totalCount: number;
    selectedGenre: string | null;
    onChange: (genre: string | null) => void;
}

export const GenreFilter = (props: Props) => {
    const {className, ...restProps} = props;

    const {isVisible, totalCount, isAllSelected, handleReset, chips} = useGenreFilter(restProps);

    if (!isVisible) {
        return null;
    }

    return (
        <div className={clsx(styles.root, className)} role="group" aria-label="Filter by genre">
            <ul className={styles.list}>
                <li>
                    <button
                        className={clsx(styles.chip, isAllSelected && styles.selected)}
                        type="button"
                        onClick={handleReset}
                        aria-pressed={isAllSelected}
                    >
                        All <span className={styles.count}>{totalCount}</span>
                    </button>
                </li>

                {chips.map((chip) => (
                    <li key={chip.name}>
                        <button
                            className={clsx(styles.chip, chip.isSelected && styles.selected)}
                            type="button"
                            onClick={chip.handleClick}
                            aria-pressed={chip.isSelected}
                        >
                            {chip.name} <span className={styles.count}>{chip.count}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
