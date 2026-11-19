export const createCache = <T>(ttlMs: number) => {
    if (!Number.isInteger(ttlMs) || ttlMs < 1 || ttlMs > 2_147_483_647) {
        throw new RangeError('Cache TTL must be an integer between 1 and 2147483647 milliseconds');
    }

    const cache: Record<string, {value: T; expiresAt: number} | undefined> = {};

    setInterval(() => {
        const now = Date.now();

        for (const key of Object.keys(cache)) {
            const entry = cache[key];
            if (entry && entry.expiresAt <= now) {
                delete cache[key];
            }
        }
    }, ttlMs).unref();

    return {
        read(key: string) {
            const entry = cache[`:${key}`];
            if (!entry) {
                return {status: 'miss'} as const;
            }

            if (entry.expiresAt <= Date.now()) {
                return {status: 'expired'} as const;
            }

            return {status: 'hit', value: entry.value} as const;
        },

        write(key: string, value: T) {
            cache[`:${key}`] = {value, expiresAt: Date.now() + ttlMs};
        },
    };
};
