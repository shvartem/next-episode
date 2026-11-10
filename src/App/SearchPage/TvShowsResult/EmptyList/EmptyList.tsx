import type {Props} from './types';

import styles from './EmptyList.module.css';

export const EmptyList = (props: Props) => {
    const {className} = props;

    return (
        <div className={className}>
            <h2 className={styles.empty}>No Data</h2>
        </div>
    );
};
