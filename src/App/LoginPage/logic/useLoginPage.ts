import {useState} from 'react';
import type {FormEvent} from 'react';
import {useStore} from 'zustand';
import {sessionStore} from '~/stores/sessionStore';
import {login} from '~/tasks/login';

export function useLoginPage() {
    const isLoggedIn = useStore(sessionStore, state => state.session !== null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const email = new FormData(event.currentTarget).get('email');
        if (isSubmitting || typeof email !== 'string') return;

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

    return {isLoggedIn, isSubmitting, error, handleSubmit};
}
