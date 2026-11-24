import {Navigate} from 'react-router';
import {useLoginPage} from './logic/useLoginPage';
import styles from './LoginPage.module.css';

export function LoginPage() {
    const {isLoggedIn, redirectTo, isSubmitting, error, handleSubmit} = useLoginPage();

    if (isLoggedIn) {
        return <Navigate to={redirectTo} replace />;
    }

    return (
        <main>
            <h1>Log in</h1>

            <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor="login-email">Email</label>
                <input id="login-email" name="email" type="email" autoComplete="email" required maxLength={254} />

                <button type="submit" disabled={isSubmitting}>
                    Log in
                </button>

                {error && <p role="alert">{error}</p>}
            </form>
        </main>
    );
}
