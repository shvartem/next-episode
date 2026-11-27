import {useSyncExternalStore} from 'react';

interface ExternalStore<State> {
    subscribe: (listener: () => void) => () => void;
    getState: () => State;
    getInitialState: () => State;
}

export const useExternalStore = <State, Selected>(store: ExternalStore<State>, selector: (state: State) => Selected) =>
    useSyncExternalStore(
        store.subscribe,
        () => selector(store.getState()),
        () => selector(store.getInitialState()),
    );
