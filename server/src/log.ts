import {styleText} from 'node:util';

const colors = {INFO: 'cyan', OK: 'green', WARN: 'yellow', ERROR: 'red'} as const;

export function log(level: keyof typeof colors, source: string, message: string) {
    const stream = level === 'ERROR' || level === 'WARN' ? process.stderr : process.stdout;
    const label = styleText(colors[level], level.padEnd(5), {stream});
    stream.write(`${new Date().toISOString()} ${label} [${source}] ${message}\n`);
}
