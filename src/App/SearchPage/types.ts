export type TvShowType = string;
export type TvShowStatus = string;
export type Genre = string;
export type ScheduleDay = string;

export interface TvShowChannel {
    id: number;
    name: string;
    country: {
        name: string;
        code: string;
        timezone: string;
    } | null;
    officialSite: string | null;
}

export interface TvShow {
    score: number;
    show: {
        id: number;
        url: string;
        name: string;
        type: TvShowType;
        language: string | null;
        genres: Genre[];
        status: TvShowStatus;
        runtime: number | null;
        averageRuntime: number | null;
        /** @format '2021-08-31' */
        premiered: string | null;
        /** @format '2021-08-31' */
        ended: string | null;
        officialSite: string | null;
        schedule: {
            time: '';
            days: ScheduleDay[];
        };
        rating: {
            average: number | null;
        };
        weight: number;
        network: TvShowChannel | null;
        webChannel: TvShowChannel | null;
        dvdCountry: null;
        externals: {
            tvrage: null;
            thetvdb: number;
            imdb: string;
        };
        image: {
            medium: string;
            original: string;
        } | null;
        /** html string*/
        summary: string | null;
        /** timestamp */
        updated: number;
        _links: {
            self: {
                href: string;
            };
            previousepisode: {
                href: string;
                name: string;
            };
            nextepisode: {
                href: string;
                name: string;
            };
        };
    };
}
