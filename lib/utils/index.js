/**
 * Mantra's error console logger utility.
 * @param {string} message - A string containing the message to log.
 */
export function error(message) {
    console.error(`[mantra]: ${message}`);
};

const supportedObjects = ['Object', 'Store'];
/*
    These functions are meant to be used as utilities for the params validation
*/
export const isTruthy = (value) => (!!value);
export const isObject = (value) => {
    if (!isTruthy(value)) return false;
    return supportedObjects.some((objDef) => value.constructor.name === objDef);
};
export const isEmptyObject = (obj) => {
    if (!isObject(obj)) return false;
    return Object.keys(obj).length === 0;
};