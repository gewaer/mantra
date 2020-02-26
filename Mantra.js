import { MantraPlugin } from './lib/MantraPlugin';
import { error } from './lib/utils';

/*
    This functions are meant to be used as utilities for the params validation
*/
const isFalsy = (value) => (!value);
const isObject = (value) => (value.constructor.name === 'Object');
const isObjectEmpty = (obj) => (Object.keys(obj).length === 0);

/*
    This function is meant to check if the schemas object is invalid

    @param {object} schemas - Contains the mantra schemas object
    @return {boolean} True if the schemas is invalid
*/
const isSchemasInvalid = function(schemas) {
    const NOT_DEFINED = isFalsy(schemas);
    const IS_NOT_OBJECT = !isObject(schemas);

    return NOT_DEFINED || IS_NOT_OBJECT;
};

/*
    This function is meant to check if the store object is invalid

    @param {object} store - Contains the store library and configuration
    @return {boolean} True if the store is invalid
*/
const isStoreInvalid = function(store) {
    const NOT_DEFINED = isFalsy(store);
    const IS_NOT_OBJECT = !isObject(store);
    const IS_OBJECT_EMPTY = isObjectEmpty(store.lib);

    return NOT_DEFINED || IS_NOT_OBJECT || IS_OBJECT_EMPTY;
};

/*
    This function is meant to validate the install options parameter

    @param {object} params - Contains the vue install configuration
    @return {boolean}
*/
const isOptionsValid = function(params) {
    const { 
        config: { schemas = null }, 
        plugins: { store = null } 
    } = params;

    if (isSchemasInvalid(schemas)) return { valid: false, reason: 'Schemas property must be an object' };

    if (isStoreInvalid(store)) return { valid: false, reason: 'Store library must be provided' };

    return { valid: true };
};

/*
    This function is meant to register Vue components

    @param {Vue} Vue - Contains the Vue Instance
    @param {object} components - Contains an object of vue components
    @return {void}
*/
const componentsRegistration = function(Vue, components) {
    const componentNames = Object.keys(components);

    for (let name of componentNames) {
        const component = components[name];
        Vue.component(name, component);
    };
};

/*
    This function is meant to register modules in the store plugin

    @param {object} store - Contains the store plugin instance and config
    @param {object} options - Contains data that's used by the store modules
    @return {object} store - Returns the modified store plugin
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

/*
    This function is meant to install Mantra as a Vue Plugin

    @param {Vue} Vue - Contains the Vue Instance
    @param {object} options - Contains configuration for Mantra installation
    @return {void}
*/
const install = function(Vue, options) {
    const { valid, reason } = isOptionsValid(options);
    if(!valid) return error(reason);

    const { 
        config: { schemas, components },
        plugins: { store }
    } = options;

    componentsRegistration(Vue, components);

    const StorePlugin = registerStoreModule(store, { schemas });

    MantraPlugin.setConfig({ store: StorePlugin });
};

export default install;