import get from 'lodash/get';
import has from 'lodash/has';
import set from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep';

import { error } from './../utils';

export default class MantraModel {
    constructor({ name, schema }) {
        this._isConstructorValid({ name, schema });
        this._path = 'model';
        const CONFIG = this._getConfig({ name, schema });
        this.setName(CONFIG);
        this.setFields(CONFIG, schema);
    }

    /**
     * Set the name property
     * @param {Object} - MantraModel configuration Object
     */
    setName(config) {
        this.name = this.getName(config);
    }

    /**
     * Resolve name property
     * @param {Object} - MantraModel configuration Object
     * @returns {string || undefined} - Value to be set on the name property.
     */
    getName(config) {
        if (config.name) return config.name;
        return;
    }

    /**
     * Resolve the MantraModelConfig needed from the schema
     * @param {Object} { name, schema } - The constructor params
     * @returns {Object} - A MantraModel configuration object.
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
     * Resolve the MantraModelConfig needed from the schema
     * @param {Object} { name, schema } - The constructor params
     * @returns {Object} - A MantraModel configuration object.
     */
    _getConfig({ name, schema }) {
        const CONFIG = this._get({ name, schema });
        this.validateConfig(CONFIG);
        return CONFIG;
    };

    /**
     * Obtain the MantraModelConfig needed from the schema
     * @param {Object} { name, schema } - The constructor params
     * @returns {Object} - A MantraModel configuration object.
     */
    _get({ name, schema }) {
        const PATH = `${this._path}.${name}`
        return get(schema, PATH);
    };

    /**
     * Resolve the MantraModelConfig needed from the schema
     * @param {Object} config - The constructor params
     * @returns {Boolean}
     */
    validateConfig(config) {
        if (typeof config === 'object' && config.fields.length > 0) {
            return;
        }
        throw new Error(error('The MantraModel is invalid'));
    };

    /**
     * Verify the validity of the MantraModel constructor params
     * @param {Object} value - The constructor params
     */
    _isConstructorValid(value) {
        const KEYS = Object.keys(value);
        for (const key of KEYS) {
            if (!value[key]) throw new Error(error(`MantraData needs a ${key} property`));
        }
    };

};
