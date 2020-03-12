import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';
import MantraComponent from './MantraComponent';
import MantraData from './../MantraData';
import { error } from '../../utils';

const MIXIN = 'MantraForm';

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
        super({ name, mixin: MIXIN });
        this.fields = fields;
    };

    /**
     * Get the config of a MantraForm component.
     * @param {object} payload - Contains the path and config for MantraData creation.
     * @returns {MantraData} The MantraForm component config.
     */
    static _getConfig({ path }) {
        const config = new MantraData({ path, baseClass: 'MantraForm' });

        try {
            config.setBase();
            config.setRecord();
            config.setAction();
            config.setComponent();
        } catch(err) {
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
        const rawComponent = get(data.schema, path);
        const component = cloneDeep(rawComponent);
        
        if (!MantraForm._isValidComponent(component)) throw new Error(`The ${component.name} component is not a valid MantraForm component`);

        return component;
    };

    /**
     * Gets the path to find the component in the schema.
     * @param {MantraData} data - A MantraData object.
     * @returns {string} Path concatenated by dots.
     */
    static _getPath(data) {
        const { path, action } = data;
        const componentPath = [path, action].join('.');
        return componentPath;
    };

    /**
     * Verify a component has a MantraForm mixin.
     * @param {MantraComponent} component - A MantraComponent object.
     * @returns {boolean} True if component has the MantraForm mixin.
     */
    static _isValidComponent(component) {
        return (component._mixin === MIXIN);
    };
};