import {styleText} from 'node:util';

type LogFields = Record<string, string | number>;

const formatLog = (level: 'info' | 'error', event: string, fields: LogFields) => {
    const stream = level === 'error' ? process.stderr : process.stdout;
    const timestamp = new Date().toISOString();

    if (!stream.isTTY || process.env.NO_COLOR !== undefined) {
        return JSON.stringify({timestamp, level, event, ...fields});
    }

    const label = styleText(level === 'error' ? 'red' : 'cyan', level.toUpperCase(), {stream});
    const eventLabel = styleText('bold', event, {stream});
    const details = Object.entries(fields).map(([key, value]) => `${key}=${JSON.stringify(value)}`);

    return [styleText('gray', timestamp, {stream}), label, eventLabel, ...details].join(' ');
};

export const logger = {
    info: (event: string, fields: LogFields = {}) => {
        console.info(formatLog('info', event, fields));
    },
    error: (event: string, error: unknown) => {
        const message = error instanceof Error ? error.message : String(error);
        console.error(formatLog('error', event, {message}));
    },
};
