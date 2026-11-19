export const requestJson = async (url: URL) => {
    const response = await fetch(url, {signal: AbortSignal.timeout(10_000)});

    if (!response.ok) {
        throw new Error(`${url.hostname} returned status ${response.status}`);
    }

    const data: unknown = await response.json();
    return {data, status: response.status};
};
