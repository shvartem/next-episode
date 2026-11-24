import {sessionRepository} from '~/api';
import {favoritesStore} from '~/stores/favoritesStore';
import {sessionStore} from '~/stores/sessionStore';

export const SESSION_TOKEN_KEY = 'next-episode:session';

export async function login(email: string) {
    const session = await sessionRepository.login(email);
    sessionStorage.setItem(SESSION_TOKEN_KEY, session.token);
    favoritesStore.setState(favoritesStore.getInitialState());
    sessionStore.setState({session});
}
