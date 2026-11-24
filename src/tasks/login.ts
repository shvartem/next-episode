import {sessionRepository} from '~/api';
import {sessionStore} from '~/stores/sessionStore';

export const SESSION_TOKEN_KEY = 'next-episode:session';

export async function login(email: string) {
    const session = await sessionRepository.login(email);
    sessionStorage.setItem(SESSION_TOKEN_KEY, session.token);
    sessionStore.setState({session});
}
