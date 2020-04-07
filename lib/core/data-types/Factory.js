import { MantraString, MantraBoolean, MantraNumber } from './index';
import { error } from '../../utils';
/**
 * Class representing any Mantra data type.
 * @typedef {Object} MantraDataType
 * @property {string} type - Indicates the data type of the object
 * @property {Object} format - Used to configure the data type functionalities
 */


/**
 * Class representing a factory of Mantra Data Types
 */
export default class DataTypeFactory {
  /**
   * Obtains a DataType class based on the type parameter.
   * @param {string} type - Identifier for mantra data types.
   * @returns {MantraDataType} - A mantra data type class.
   */
  static getClass(type, DATA_TYPES) {
    return DATA_TYPES[type];
  };

  /**
   * Verify if the type represents a supported data type.
   * @param {string} type - Identifier used to select a data type.
   * @returns {boolean}
   */
  static isValidType(type, DATA_TYPES) {
    if (!Object.prototype.hasOwnProperty.call(DATA_TYPES, type)) {
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
    const DATA_TYPES = {
      'String': MantraString,
      'Number': MantraNumber,
      'Boolean': MantraBoolean
    };

    const { valid, reason } = DataTypeFactory.isValidType(type, DATA_TYPES);
    if (!valid) {
      return error(reason);
    }

    const DataType = DataTypeFactory.getClass(type, DATA_TYPES);
    return new DataType(params);
  };
};