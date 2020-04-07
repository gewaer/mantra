import MantraDataType from './MantraDataType';

/**
 * Class representing the string data type.
 * @extends MantraDataType
 */
export default class MantraString extends MantraDataType {
	/**
	 * Creates a string data type object.
	 * @param {object} dataType - Configuration used to configure the string data type.
	 */
  constructor(dataType) {
    super(dataType);
  }
};