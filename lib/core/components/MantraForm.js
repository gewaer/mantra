import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';
import MantraComponent from './MantraComponent';
import MantraData from './../MantraData';

/**
 * This function checks if the config _path property is not empty.
 *
 * @param {MantraData} config - A MantraData object
 * @return {boolean|Error} - True if the path is empty & an error if is not empty.
 */
const IS_PATH_EMPTY = function (config) {
    if (config._path === '') 
        return true;
    else
        throw new Error('Configuration path was not completely resolved');
};

/**
 * Class representing a form component configuration.
 * @extends MantraComponent
 */
export default class MantraForm extends MantraComponent {
    /**
     * Creates a MantraForm configuration.
     * @param {object} payload - Contains the value of the MantraForm properties.
     */
    constructor({ name, fields }) {
        super({ name, mixin: 'MantraForm' });
        this.fields = fields;
    };

    /**
     * Get the config of a MantraForm component.
     * @param {object} payload - Contains the path and config for MantraData creation.
     * @returns {MantraData} - The MantraForm component config.
     */
    static _getConfig({ path }) {
        const config = new MantraData({ path, baseClass: MantraForm });
        
        config.setBase();
        config.setRecord();
        config.setAction();
        config.setComponent();
        config.setEndpoint();

        return IS_PATH_EMPTY(config) && config;
    };

    /**
     * Gets a MantraForm component object based on a MantraData schema object.
     * @param {MantraData} data - A MantraData object.
     * @returns {MantraForm} - A cloned MantraForm component object.
     */
    static getComponent(data) {
        const path = MantraForm._getPath(data);
        const component = get(data.schema, path);
        return cloneDeep(component);
    };

    /**
     * Gets the path to find the component in the schema.
     * @param {MantraData} data - A MantraData object.
     * @returns {string} - Path concatenated by dots. (Empty strings are not added to the path)
     */
    static _getPath(data) {
        const pathInfo = ['actions', data.action.name, data.context];
        const filteredInfo = pathInfo.filter((str) => str);
        return filteredInfo.join('.');
    };
};