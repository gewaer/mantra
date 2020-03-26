import DataTypeFactory from '../data-types/Factory';

/**
 * Class representing the base for the MantraStates
 */
export default class MantraState {
    /**
     * Creates a base MantraState.
     * @param {object} config - Contains all the properties needed by a MantraState.
     */
    constructor({ type, config = {}, name = '', defaultValue = ''}) {
        this.type = type;
        this.config = config;
        this.name = name;
        this.defaultValue = defaultValue;
        this.component = {};
        this.data = {};
        this._dataType = {};
        this._root = '';
        this._path = {};
    };

    /**
     * Obtain all the parameters required to create a MantraDataType.
     * @returns {object} - A object containing a MantraDataType parameters.
     */
    _getDataTypeProps() {
        const type = this.type;
        const config = this.config;
        return { ...config, type };
    };

    /**
     * Sets a MantraDataType object to this MantraState class.
     */
    _setDataType() {
        const params = this._getDataTypeProps();
        this._dataType = DataTypeFactory.create(params);
    };

    /**
     * Path location of the MantraState in a store component
     */
    get path() {
        return this._path.value;
    };
};