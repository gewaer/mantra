import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';
import MantraComponent from './MantraComponent';
import MantraData from './../MantraData';
import { error } from '../../utils';

/**
 * Class representing a form component configuration.
 * @extends MantraComponent
 */
export default class MantraForm extends MantraComponent {
    /**
     * Creates a form config.
     * @param {object} payload - Contains the value of the class properties.
     */
    constructor({ name, fields }) {
        super({ name, mixin: 'MantraForm' });
        this.fields = fields;
    };

    /**
     * Get the config of a MantraForm component.
     * @param {object} payload - Contains the path and config for MantraData creation.
     * @returns {MantraData} The MantraForm component config.
     */
    static _getConfig({ path }) {
        const config = new MantraData({ path, baseClass: MantraForm });
        
        try {
            config.setBase();
            config.setRecord();
            config.setAction();
            config.setComponent();
            config.setEndpoint();
        } catch (err) {
            // Gracefully failing
            error(err.message);
        }
        return config;
    };

    /**
     * Gets a MantraForm configuration object from a MantraData schema object.
     * @param {MantraData} data - A MantraData object.
     * @returns {MantraForm}
     */
    static getComponent(data) {
        const path = MantraForm._getPath(data);
        const component = get(data.schema, path);
        return cloneDeep(component);
    };

    /**
     * Gets the path to find the component in the schema.
     * @param {MantraData} data - A MantraData object.
     * @returns {string} Path concatenated by dots.
     */
    static _getPath(data) {
        // String concat of truthy values
        return ['actions', data.action.name, data.context].filter((str) => str).join('.');
    };
};