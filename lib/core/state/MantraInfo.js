import MantraState from './MantraState';

/**
 * Class representing a MantraInfo state configuration
 * @extends MantraState
 */
export default class MantraInfo extends MantraState {
  /**
   * Creates a MantraInfo state configuration.
   * @param {object} payload - Contains the value of the MantraInfo properties.
   */
  constructor({ name, type, defaultValue }) {
    super({ name, type, defaultValue });
    this._root = 'info';
  }
}