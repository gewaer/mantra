import MantraDataType from './MantraDataType';

/**
 * Class representing the boolean data type.
 * @extends MantraDataType
 */
export default class MantraBoolean extends MantraDataType {
	/**
	 * Creates a boolean data type object.
	 * @param {object} dataType - Configuration used to configure the boolean data type.
	 */
	constructor(dataType) {
		super(dataType);
	}

	/**
	 * Cast the value parameter to a boolean.
	 * @param {any} value - Any value to cast to boolean.
	 * @return {any} The value casted to boolean.
	 */
	sanitize(value) {
		return Boolean(value);
	}
};