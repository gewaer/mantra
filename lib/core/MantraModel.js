/**
 * Object with the properties needed to instantiate a MantraModel class.
 * @typedef {Object} MantraModelConfig
 * @property {Array} fields - Fields to resolve from a MantraSchema.
 * @property {String} name - Name identifying the model to be set on its parent class.
 */

/**
 * Entity schema configuration set at installation.
 * @typedef {Object} MantraSchema
 * @property {Object} fields - Fields to serve as source for Model's fields.
 * @property {Object} model - Object with MantraModelConfigs to pick the base one for the class.
 */

/**
 * MantraModel class constructor params.
 * @typedef {Object} ConstructorParams
 * @property {String} name - Name indicating the Model configuration in the MantraSchema to base the class.
 * @property {MantraSchema} schema - Indicates whether the Power component is present.
 */


import get from 'lodash/get';
import has from 'lodash/has';
import set from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep';

import { error } from './../utils';

export default class MantraModel {
    constructor({ name, schema }) {
        this._isValidConstructor({ name, schema });
        this._path = 'model';
        const CONFIG = this._getConfig({ name, schema });
        this.setName(CONFIG);
        this.setFields(CONFIG, schema);
    }

    /**
     * Set the name property.
     * @param {MantraModelConfig} - Object to resolve the class name property.
     */
    setName(config) {
        this.name = this.getName(config);
    }

    /**
     * Resolve name property.
     * @param {MantraModelConfig} - Object to set the class name property.
     * @returns {string || undefined} - Value to be set on the name property.
     */
    getName(config) {
        if (config.name) return config.name;
        return;
    }

    /**
     * Resolve the MantraModelConfig needed from the schema.
     * @param {MantraModelConfig} config - source of fields to resolve.
     * @param {MantraSchema} schema - class used as source to resolve the fields to be set on the class property.
     */
    setFields(config, schema) {
        const { fields: fieldSource } = schema;
        const { fields } = config;

        this.fields = fields.reduce((acc, field) => {
            if (!has(fieldSource, field)){
                throw new Error( error(`Field ${field} not found in ${schema.name} schema`) );
            }
            set(acc, field, cloneDeep(fieldSource[field]));
            return acc;
        }, {});
    };

    /**
     * Resolve the MantraModelConfig needed from the schema.
     * @param {ConstructorParams} - Properties used to resolve a proper MantraModelConfig.
     * @returns {MantraModelConfig} - Configuration to base the class.
     */
    _getConfig({ name, schema }) {
        const CONFIG = this._get({ name, schema });
        this.validateConfig(CONFIG);
        return CONFIG;
    };

    /**
     * Obtain the MantraModelConfig needed from the schema.
     * @param {ConstructorParams} - The constructor params to resolve a MantraModelConfig from the MantraSchema class.
     * @returns {MantraModelConfig} - Configuration to base the class.
     */
    _get({ name, schema }) {
        const PATH = `${this._path}.${name}`
        return get(schema, PATH);
    };

    /**
     * Resolve the MantraModelConfig needed from the schema.
     * @param {ConstructorParams} config - The constructor params.
     * @returns {Error|void} - Throw Error if MantraModel is invalid. Otherwise return void.
     */
    validateConfig(config) {
        if (typeof config === 'object' && config.fields.length > 0) {
            return;
        }
        throw new Error(error('The MantraModel is invalid'));
    };

    /**
     * Verify the validity of the MantraModel constructor params.
     * @param {ConstructorParams} value - The constructor params to check its validity.
     * @returns {Error|void} returns an error if the `value` object have falsy properties.
     */
    _isValidConstructor(value) {
        const KEYS = Object.keys(value);
        for (const key of KEYS) {
            if (!value[key]) throw new Error(error(`MantraData needs a ${key} property`));
        }
    };

};
