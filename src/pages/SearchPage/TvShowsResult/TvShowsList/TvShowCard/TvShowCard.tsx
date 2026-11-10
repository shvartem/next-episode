import clsx from 'clsx';

import type {Props} from './types';
import {useTvShowCardPresenter} from './useTvShowCardPresenter';

import styles from './TvShowCard.module.css';

export const TvShowCard = (props: Props) => {
    const {className} = props;

    const {name, url, posterUrl, posterAlt, details, rating, hasRating, genres, hasGenres, summary} =
        useTvShowCardPresenter(props);

    return (
        <article className={clsx(styles.root, className)}>
            {posterUrl ? (
                <img className={styles.poster} src={posterUrl} alt={posterAlt} loading="lazy" />
            ) : (
                <div className={clsx(styles.poster, styles.noPoster)}>No poster</div>
            )}

            <div className={styles.content}>
                <h2 className={styles.name}>
                    <a href={url} target="_blank" rel="noreferrer">
                        {name}
                    </a>
                </h2>

                {details && <p className={styles.details}>{details}</p>}

                {hasRating && <p className={styles.rating}>Rating: {rating}</p>}

                {hasGenres && (
                    <ul className={styles.genres}>
                        {genres.map((genre) => (
                            <li key={genre} className={styles.genre}>
                                {genre}
                            </li>
                        ))}
                    </ul>
                )}

                {summary && <p className={styles.summary}>{summary}</p>}
            </div>
        </article>
    );
};
