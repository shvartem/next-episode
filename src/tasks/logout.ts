import {sessionRepository} from '~/api';
import {favoritesStore} from '~/stores/favoritesStore';
import {sessionStore} from '~/stores/sessionStore';
import {SESSION_TOKEN_KEY} from './login';

export async function logout() {
    const {session} = sessionStore.getState();

    if (!session) {
        return;
    }

    await sessionRepository.logout(session.token);
    sessionStorage.removeItem(SESSION_TOKEN_KEY);
    favoritesStore.setState(favoritesStore.getInitialState());
    sessionStore.setState({session: null});
}
