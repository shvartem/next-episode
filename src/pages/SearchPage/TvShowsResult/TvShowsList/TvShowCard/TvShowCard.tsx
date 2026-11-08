import clsx from 'clsx';

import styles from './TvShowCard.module.css';
import type {TvShow} from '../../../../../api/types';

interface Props {
    className?: string;
    card: TvShow;
}

const getPlainText = (html: string) => {
    const htmlWithSpaces = html.replace(/<\/p>|<br\s*\/?>/gi, ' ');

    return new DOMParser().parseFromString(htmlWithSpaces, 'text/html').body.textContent.trim();
};

export const TvShowCard = (props: Props) => {
    const {className, card} = props;
    const {show} = card;

    const channel = show.network ?? show.webChannel;
    const details = [show.premiered?.slice(0, 4), show.status, show.type, show.language, channel?.name]
        .filter(Boolean)
        .join(' · ');
    const summary = show.summary && getPlainText(show.summary);

    return (
        <article className={clsx(styles.root, className)}>
            {show.image ? (
                <img className={styles.poster} src={show.image.medium} alt={`${show.name} poster`} loading="lazy" />
            ) : (
                <div className={clsx(styles.poster, styles.noPoster)}>No poster</div>
            )}

            <div className={styles.content}>
                <h2 className={styles.name}>
                    <a href={show.url} target="_blank" rel="noreferrer">
                        {show.name}
                    </a>
                </h2>

                {details && <p className={styles.details}>{details}</p>}

                {show.rating.average !== null && <p className={styles.rating}>Rating: {show.rating.average}</p>}

                {!!show.genres.length && (
                    <ul className={styles.genres}>
                        {show.genres.map((genre) => (
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
