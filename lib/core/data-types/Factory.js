import MantraDataType from './MantraDataType';
import { MantraString, MantraBoolean, MantraNumber } from './index';
import { error } from '../../utils';

/*
    This object contains all the supported MantraDataTypes.
*/
const DATA_TYPES = {
    'Boolean': MantraBoolean,
    'String': MantraString,
    'Number': MantraNumber
};

/**
 * Class representing a factory of Mantra Data Types
 */
export default class DataTypeFactory {
    /**
     * Obtains a DataType class based on the type parameter.
     * @param {string} type - Identifier for mantra data types.
     * @returns {MantraDataType} - A mantra data type class.
     */
    static getClass(type) {
        return DATA_TYPES[type];
    };

    /**
     * Verify if the type represents a supported data type.
     * @param {string} type - Identifier used to select a data type.
     * @returns {boolean}
     */
    static isValidType(type) {
        if (!DATA_TYPES.hasOwnProperty(type)) {
            return { valid: false, reason: 'Must provide a supported data type' };
        }
        return { valid: true };
    };

    /**
     * Create a MantraDataType classed based on a type.
     * @param {object} params - Configuration object for the data type creation.
     * @returns {MantraDataType} - A mantra data type object.
     */
    static create(params) {
        const { type } = params;

        const { valid, reason } = DataTypeFactory.isValidType(type);
        if (!valid) {
            return error(reason);
        }

        const DataType = DataTypeFactory.getClass(type);
        return new DataType(params);
    };
};