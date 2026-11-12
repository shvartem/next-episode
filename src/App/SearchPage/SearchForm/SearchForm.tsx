import clsx from 'clsx';

import type {Props} from './types';
import {useSearchForm} from './useSearchForm';

import styles from './SearchForm.module.css';

export const SearchForm = (props: Props) => {
    const {className, hint} = props;

    const {search, handleChange} = useSearchForm(props);

    return (
        <div className={clsx(styles.root, className)} role="search">
            <label className={styles.label} htmlFor="search">
                Search TV shows
            </label>

            <div className={styles.field}>
                <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                </svg>

                <input
                    className={styles.input}
                    type="text"
                    name="search"
                    id="search"
                    value={search}
                    onChange={handleChange}
                    placeholder="Search TV shows"
                    autoComplete="off"
                    aria-describedby="search-hint"
                />
            </div>

            <p className={styles.hint} id="search-hint">
                {hint}
            </p>
        </div>
    );
};
