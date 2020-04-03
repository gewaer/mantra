import { MantraPlugin } from './lib/MantraPlugin';
import { error } from './lib/utils';
import { isTruthy, isObject, isEmptyObject } from './lib/utils';

/**
 * This function is meant to check if the schemas parameter is an object value.
 *
 * @param {object} schemas - Contains the schemas configuration.
 * @return {boolean} True if the schemas parameter is an object value.
 */
export const isValidSchema = function(schemas) {
    const IS_DEFINED = isTruthy(schemas);
    return IS_DEFINED && isObject(schemas);
};

/**
 * This function is meant to check if the store object is valid.
 *
 * @param {object} store - Contains the store library and configuration.
 * @returns {boolean} - True if the store is valid.
 */
export const isValidStore = function(store) {
    const IS_DEFINED = isTruthy(store);
    return IS_DEFINED && isObject(store) && !isEmptyObject(store) && !isEmptyObject(store.lib);
};

/**
 * This function is meant to validate the install options parameter.
 *
 * @param {object} params - Contains the vue install configuration.
 * @returns {object} Contains a boolean `valid` prop thats true if options is valid and a `reason` prop in case its not valid
 */
export const isOptionsValid = function(params) {
    const {
        config: { schemas = null },
        plugins: { store = null }
    } = params;

    if (!isValidSchema(schemas)) {
        return { valid: false, reason: 'Schemas property must be an object' };
    }

    if (!isValidStore(store)) {
        return { valid: false, reason: 'Store library must be provided' };
    }

    return { valid: true };
};

/**
 * This function is meant to register Vue components.
 *
 * @param {Vue} Vue - Contains the Vue Instance.
 * @param {object} components - Contains an object of vue components.
 * @returns {Error|void} If the components param is falsy or not object then an exception is thrown
 */
export const componentsRegistration = function(Vue, components) {
    if (!isTruthy(components) || !isObject(components)) {
        throw new Error('Mantra installation expects Vue components in its config parameter');
    }

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
export const registerStoreModule = function(store, options) {
    const { lib } = store;
    const { schemas } = options;

    // Registering schema module
    lib.registerModule('schemas', {
        namespaced: true,
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
 * This function is meant to install Mantra as a Vue Plugin.
 *
 * @param {Vue} Vue - Contains the Vue Instance.
 * @param {object} options - Contains configuration for Mantra installation
 * @returns {Error|Console|void}
 */
export const install = function(Vue, options) {
    const { valid, reason } = isOptionsValid(options);
    if(!valid) return error(reason);

    const {
        config: { schemas, components },
        plugins: { store }
    } = options;

    try {
        componentsRegistration(Vue, components);
    } catch(er) {
        return error(er.message);
    }

    const StorePlugin = registerStoreModule(store, { schemas });
    
    MantraPlugin.setConfig({ store: StorePlugin });
};

export default install;
