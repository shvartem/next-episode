import clsx from 'clsx';
import type {Props} from './types';

import styles from './FavoriteButton.module.css';

export const FavoriteButton = ({className, type = 'button', ...props}: Props) => (
    <button {...props} className={clsx(styles.favoriteButton, className)} type={type} />
);
