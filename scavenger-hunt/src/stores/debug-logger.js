import { writable } from 'svelte/store';

let logger;

const maxLogLength = 100;
const logLevelList = ['log', 'error', 'warning'];

export function getLogger() {
    if (!logger) {
        const { subscribe, update } = writable([]);
        logger = {
            subscribe,
            log: ({ logLevel, message }) =>
                update((existingLog) => {
                    // only keep 100 log entries
                    if (existingLog.length > maxLogLength) {
                        existingLog.shift();
                    }
                    if (!logLevelList.includes(logLevel)) {
                        throw new Error('log entry has invalid log level');
                    }
                    return [
                        ...existingLog,
                        { logLevel, message, timestamp: new Date() },
                    ];
                }),
        };
    }
    return logger;
}
