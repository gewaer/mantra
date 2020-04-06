import { isObject } from "../../utils";

export const getPathFromObject = function (object) {
    if (!isObject(object)) throw new Error(`Expected an Object value and obtained: ${object.constructor.name}`);

    const path = Object.values(object).join('.');
    return path;
};

export const pushToRouteParams = function (route, payload) {
    for (const [key, value] of Object.entries(payload)) {
        route.params[key] = value;
    }
};