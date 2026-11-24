import {createStore} from 'zustand/vanilla';
import type {Session} from '../../shared/auth';

export const sessionStore = createStore<{session: Session | null}>(() => ({session: null}));
