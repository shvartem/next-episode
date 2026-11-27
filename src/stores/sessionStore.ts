import {createStore} from 'zustand/vanilla';
import type {Session} from '../../shared/auth';

export interface SessionState {
    session: Session | null;
}

export const sessionStore = createStore<SessionState>(() => ({session: null}));
