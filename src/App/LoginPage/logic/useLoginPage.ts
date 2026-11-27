import {useState} from 'react';
import type {FormEvent} from 'react';
import {matchPath, parsePath, useLocation} from 'react-router';
import {useSessionStore} from '~/App/hooks/useSessionStore';
import {login} from '~/tasks/login';

export function useLoginPage() {
    const {state} = useLocation();
    const returnTo: unknown = state?.returnTo;
    const pathname = typeof returnTo === 'string' ? parsePath(returnTo).pathname : undefined;
    const redirectTo =
        typeof returnTo === 'string' &&
        pathname?.startsWith('/') &&
        !pathname.startsWith('//') &&
        !pathname.includes('\\') &&
        !matchPath('/login', pathname)
            ? returnTo
            : '/';

    const isLoggedIn = useSessionStore((state) => state.session !== null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const email = new FormData(event.currentTarget).get('email');

        if (isSubmitting || typeof email !== 'string') {
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            await login(email);
        } catch {
            setError('Could not log in. Check your email and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return {isLoggedIn, redirectTo, isSubmitting, error, handleSubmit};
}
