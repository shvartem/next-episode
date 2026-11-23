import type {Props} from './types';

import styles from './Toast.module.css';

export const Toast = (props: Props) => {
    const {message} = props;

    return (
        <div className={styles.root} role="status">
            {message && <div className={styles.message}>{message}</div>}
        </div>
    );
};
