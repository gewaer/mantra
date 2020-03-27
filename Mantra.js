/**
 * Object with the properties needed to instantiate a MantraModel class.
 * @typedef {Object} HttpClientConfig
 * @property {String} name - Name of the key at the vue.prototype to retrieve the HttpClient library.
 * @property {Function} _get - Temporary method to closure the Vue instance and retrieve from the HttpClient library.
 */

import { MantraPlugin } from './lib/MantraPlugin';
import { error } from './lib/utils';

/*
    These functions are meant to be used as utilities for the params validation
*/
const isTruly = (value) => (!!value);
const isObject = (value) => (value.constructor.name === 'Object');
const isEmptyObject = (obj) => (Object.keys(obj).length === 0);

/**
 * This function is meant to check if the schemas object is valid.
 *
 * @param {object} schemas - Contains the mantra schemas object.
 * @return {boolean} - True if the schemas is valid.
 */
const isValidSchema = function(schemas) {
    const IS_DEFINED = isTruly(schemas);
    const IS_OBJECT = isObject(schemas);

    return IS_DEFINED && IS_OBJECT;
};

/**
 * This function is meant to check if the store object is valid.
 *
 * @param {object} store - Contains the store library and configuration.
 * @returns {boolean} - True if the store is valid.
 */
const isValidStore = function(store) {
    const IS_DEFINED = isTruly(store);
    const IS_OBJECT = isObject(store);
    const IS_EMPTY_OBJECT = isEmptyObject(store.lib);

    return IS_DEFINED && IS_OBJECT && !IS_EMPTY_OBJECT;
};

/**
 * This function is meant to validate the install options parameter.
 *
 * @param {object} params - Contains the vue install configuration.
 * @returns {boolean}
 */
const isOptionsValid = function(params) {
    const {
        config: { schemas = null },
        plugins: { store = null, httpClient = null }
    } = params;

    if (!isValidSchema(schemas)) {
        return { valid: false, reason: 'Schemas property must be an object' };
    }

    if (!isValidStore(store)) {
        return { valid: false, reason: 'Store library must be provided' };
    }

    if (!isValidStore(httpClient)) {
        return { valid: false, reason: 'HttpClient library configuration must be provided' };
    }

    return { valid: true };
};

/**
 * This function is meant to register Vue components.
 *
 * @param {Vue} Vue - Contains the Vue Instance.
 * @param {object} components - Contains an object of vue components.
 */
const componentsRegistration = function(Vue, components) {
    const componentNames = Object.keys(components);

    for (let name of componentNames) {
        const component = components[name];
        Vue.component(name, component);
    };
};


/**
 * This function is meant to register modules in the store plugin.
 *
 * @param {object} store - Contains the store plugin instance and config.
 * @param {object} options - Contains data that's used by the store modules.
 * @returns {object} - Returns the modified store plugin.
 */
const registerStoreModule = function(store, options) {
    const { lib } = store;
    const { schemas } = options;

    // Registering schema module
    lib.registerModule('schemas', {
        state: {
            ...schemas
        },
        getters: {},
        mutations: {},
        actions: {}
    });

    return lib;
};

/**
 * Temporary handler to set some dynamic approach to handle custom HttpClient library.
 *
 * @param {String} lib - Name of the key at the vue.prototype to retrieve the HttpClient library.
 * @param {Vue} Vue - Vue instance to retrive the HttpClient from its prototype.
 * @returns {HttpClientConfig} - Return the config to set at the httpClient.
 */
const setHttpClient = function(name) {
    return {
        name,
        _get: function() {            
            return this[`$${name}`];
        }
    };
};

/**
 * This function is meant to install Mantra as a Vue Plugin.
 *
 * @param {Vue} Vue - Contains the Vue Instance.
 * @param {object} options - Contains configuration for Mantra installation.
 */
const install = function(Vue, options) {
    const { valid, reason } = isOptionsValid(options);
    if(!valid) return error(reason);

    const {
        config: { schemas, components },
        plugins: { store, httpClient }
    } = options;

    componentsRegistration(Vue, components);
    const StorePlugin = registerStoreModule(store, { schemas });
    const HttpClientConfig = setHttpClient(httpClient.lib);

    MantraPlugin.setConfig({ store: StorePlugin, httpClient: HttpClientConfig });
    
};

export default install;
