import clsx from 'clsx';

import {FavoriteLoginPrompt} from './FavoriteLoginPrompt/FavoriteLoginPrompt';
import type {Props} from './types';
import {useTvShowCard} from './logic/useTvShowCard';

import styles from './TvShowCard.module.css';

export const TvShowCard = (props: Props) => {
    const {className} = props;

    const {
        name, url, posterUrl, posterAlt, details, rating, hasRating, genres, hasGenres, summary,
        favoriteLabel, isFavorite, isFavoriteDisabled, handleFavoriteClick,
        favoritePressed, favoriteLoginPromptId, loginState,
    } = useTvShowCard(props);

    return (
        <article className={clsx(styles.root, className)}>
            {posterUrl ? (
                <img className={styles.poster} src={posterUrl} alt={posterAlt} loading="lazy" />
            ) : (
                <div className={clsx(styles.poster, styles.noPoster)}>No poster</div>
            )}

            <div className={styles.content}>
                <div className={styles.heading}>
                    <h2 className={styles.name}>
                        <a href={url} target="_blank" rel="noreferrer">
                            {name}
                        </a>
                    </h2>

                    <button
                        className={styles.favoriteButton}
                        type="button"
                        aria-label={favoriteLabel}
                        aria-pressed={favoritePressed}
                        popoverTarget={favoriteLoginPromptId}
                        disabled={isFavoriteDisabled}
                        onClick={handleFavoriteClick}
                    >
                        <span aria-hidden="true">{isFavorite ? '★' : '☆'}</span>
                    </button>
                </div>

                {favoriteLoginPromptId && <FavoriteLoginPrompt id={favoriteLoginPromptId} loginState={loginState} />}
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
