import {Link} from 'react-router';
import type {Props} from './types';

import styles from './FavoriteLoginPrompt.module.css';

export const FavoriteLoginPrompt = ({id, loginState}: Props) => (
    <p id={id} className={styles.root} popover="auto">
        <Link to="/login" state={loginState}>Log in</Link> to save this show.
    </p>
);
