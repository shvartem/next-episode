import {useToast} from './logic/useToast';

import styles from './Toast.module.css';

export const Toast = () => {
    const toast = useToast();

    return (
        <div className={styles.root} role="status">
            {toast && (
                <div className={styles.message} data-tone={toast.tone}>
                    {toast.message}
                </div>
            )}
        </div>
    );
};
