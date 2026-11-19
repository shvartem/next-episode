import {tvMazeApi} from "~/api";
import type {TvShow} from "../types";

export const getTvShowsList = ({query, signal}: {query: string; signal?: AbortSignal}) =>
    tvMazeApi<TvShow[]>({endpoint: 'search/shows', queryParams: {q: query}, signal});
