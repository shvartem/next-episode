export class HttpResponseError extends Error {
    readonly status: number;

    constructor(url: URL, status: number) {
        super(`${url.hostname} returned status ${status}`);
        this.status = status;
    }
}

export const requestJson = async (url: URL) => {
    const response = await fetch(url, {signal: AbortSignal.timeout(10_000)});

    if (!response.ok) {
        throw new HttpResponseError(url, response.status);
    }

    const data: unknown = await response.json();
    return {data, status: response.status};
};
