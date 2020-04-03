/**
 * Mantra's error console logger utility.
 * @param {string} message - A string containing the message to log.
 */
export function error(message) {
    console.error(`[mantra]: ${message}`);
};

/*
    These functions are meant to be used as utilities for the params validation
*/
export const isTruthy = (value) => (!!value);
export const isObject = (value) => (value.constructor.name === 'Object');
export const isEmptyObject = (obj) => (Object.keys(obj).length === 0);