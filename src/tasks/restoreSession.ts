import {sessionRepository} from '~/api';
import {sessionStore} from '~/stores/sessionStore';
import {SESSION_TOKEN_KEY} from './login';

export async function restoreSession() {
    const token = sessionStorage.getItem(SESSION_TOKEN_KEY);
    if (!token) return;

    try {
        const session = await sessionRepository.get(token);
        if (sessionStorage.getItem(SESSION_TOKEN_KEY) === token) sessionStore.setState({session});
    } catch {
        // Keep the app available for browsing if the session cannot be restored.
    }
}
