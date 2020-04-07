import MantraDataType from './MantraDataType';

/**
 * Class representing the number data type.
 * @extends MantraDataType
 */
export default class MantraNumber extends MantraDataType {
	/**
	 * Creates a number data type object.
	 * @param {object} dataType - Configuration used to configure the number data type.
	 */
  constructor(dataType) {
    super(dataType);
  }

	/**
	 * Cast the value parameter to a number.
	 * @param {any} value - Any value to cast to number.
	 * @returns {any} - The value casted to number.
	 */
  sanitize(value) {
    return Number(value);
  }
};