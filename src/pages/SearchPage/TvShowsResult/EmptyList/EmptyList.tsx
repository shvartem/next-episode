import styles from './EmptyList.module.css';

interface Props {
    className?: string;
}

export const EmptyList = (props: Props) => {
    const {className} = props;

    return (
        <div className={className}>
            <h2 className={styles.empty}>No Data</h2>
        </div>
    );
};
