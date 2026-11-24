import {useToast} from './logic/useToast';

import styles from './Toast.module.css';

export const Toast = () => {
    const message = useToast();

    return (
        <div className={styles.root} role="status">
            {message && <div className={styles.message}>{message}</div>}
        </div>
    );
};
