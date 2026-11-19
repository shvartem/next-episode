import type {createCache} from './entities/createCache.ts';
import {logger} from './logger.ts';

interface CachedRequestOptions<T> {
    cache: ReturnType<typeof createCache<T>>;
    load: (url: URL) => Promise<T>;
    logPrefix: string;
}

export const createCachedRequest = <T>({cache, load, logPrefix}: CachedRequestOptions<T>) => {
    const pending = new Map<string, Promise<T>>();

    return async (url: URL): Promise<T> => {
        const key = url.href;
        const cached = cache.read(key);

        if (cached.status === 'hit') {
            logger.info(`${logPrefix}.cache.hit`);
            return cached.value;
        }

        const inFlight = pending.get(key);
        if (inFlight) {
            logger.info(`${logPrefix}.request.joined`);
            return inFlight;
        }

        logger.info(`${logPrefix}.request.started`, {cache: cached.status});
        const request = load(url)
            .then((value) => {
                cache.write(key, value);
                return value;
            })
            .finally(() => pending.delete(key));

        pending.set(key, request);
        return request;
    };
};
