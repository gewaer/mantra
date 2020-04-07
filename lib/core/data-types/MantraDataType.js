/** Class representing any Mantra data type. */
export default class MantraDataType {
	/**
	 * Create a basis for the data types.
	 * @param {object} dataType - The configuration that determines and condition the data type instantiation.
	 */
  constructor(dataType) {
    const { type = 'String', format = {} } = dataType;

    this.type = type;
    this.format = format;
  }

	/**
	 * Cast a value based on the class data type. The default casting is to String.
	 * @param {any} value - Any value that will be cast by the function.
	 * @returns {any} - The value casted to the class data type.
	 */
  sanitize(value) {
    return value.toString();
  }
};