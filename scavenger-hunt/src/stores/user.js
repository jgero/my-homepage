import { writable } from 'svelte/store';
import { getLogger } from './debug-logger';
import firebase from 'firebase/app';

let userId;
let authListener;
let logger;

export function getUserId() {
    if (!logger) {
        logger = getLogger();
    }
    if (!userId) {
        const { subscribe, update } = writable(null);
        userId = {
            subscribe,
            setUserId: (newUserId) =>
                update(() => {
                    logger.log({
                        logLevel: 'log',
                        message: `auth state changed to uid: ${newUserId}`,
                    });
                    return newUserId;
                    logger.log({
                        logLevel: 'log',
                        message: `logged in anonymously`,
                    });
                }),
            reset: () =>
                update(async () => {
                    try {
                        await firebase.auth().signOut();
                        logger.log({
                            logLevel: 'log',
                            message: `logged out`,
                        });
                        await firebase.auth().signInAnonymously();
                    } catch (e) {
                        logger.log({
                            logLevel: 'error',
                            message: `could not reset user: ${JSON.stringify(
                                e
                            )}`,
                        });
                    }
                }),
        };
    }
    return userId;
}
