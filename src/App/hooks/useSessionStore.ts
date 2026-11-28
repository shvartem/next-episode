import {sessionStore, type SessionState} from "~/stores/sessionStore";
import {useExternalStore} from "./useExternalStore";

export const useSessionStore = <Selected>(selector: (state: SessionState) => Selected) =>
    useExternalStore(sessionStore, selector);