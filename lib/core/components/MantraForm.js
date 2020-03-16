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
        console.log("[getComponent] COMPONENT PATH", path);
        console.log("[getComponent] SCHEMA", data.schema);
        const rawComponent = get(data.schema, path);
        console.log("[getComponent] RAW COMPONENT", rawComponent);
        const component = cloneDeep(rawComponent);
        return component;
    };

    /**
     * Gets the path to find the component in the schema.
     * @param {MantraData} data - A MantraData object.
     * @returns {string} Path concatenated by dots.
     */
    static _getPath(data) {
        const testComponentPath = ['actions', data.action.name].join('.');
        return testComponentPath;
        // const componentPath = [data.path, data.action.name].join('.');
        // return componentPath;
    };
};