import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';

import MantraComponent from './MantraComponent';
import MantraData from './../MantraData';
import { error } from '../../utils';
import MantraModel from './../MantraModel';

/**
 * Class representing a form component configuration.
 * @extends MantraComponent
 */
export default class MantraForm extends MantraComponent {
    /**
     * Creates a MantraForm configuration.
     * @param {object} payload - Contains the value of the MantraForm properties.
     */
    constructor({ name, model }) {
        super({ name, mixin: 'MantraForm' , root:'state'});
        this._isConstructorValid({ model });
        this.model = model;
    };

    /**
     * Get the config of a MantraForm component.
     * @param {object} payload - Contains the path and config for MantraData creation.
     * @returns {MantraData} - The MantraForm component config.
     */
    static _getConfig({ path }) {
        const config = new MantraData({ path, baseClass: 'MantraForm' });
        
        config.setBase();
        config.setRecord();
        config.setAction();
        config.setComponent();
        config.setEndpoint();
        config.isValid();

        return config;
    };

    /**
     * Gets a MantraForm component object based on a MantraData schema object.
     * @param {MantraData} data - A MantraData object.
     * @returns {MantraForm} - A cloned MantraForm component object.
     */
    static getComponent(data) {
        const path = MantraForm._getPath(data);
        const component = cloneDeep(get(data.schema, path));        
        component.setModel(data);
        return component;
    };

    /**
     * Set the model property for a MantraForm
     * @param {MantraData} data - A MantraData object.
     */
    setModel(data) {
        const { schema } = data;
        const name = this.model;
        this.model = new MantraModel({ name, schema });
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

    /**
     * Verify the validity of the MantraForm constructor params
     * @param {Object} value - The constructor params
     */
    _isConstructorValid({ model }) {
        if (!model) throw new Error(error('MantraForm needs a Model property'));
    };

    /**
     * Evaluate if the class' model property is an instance of the MantraModel class
     * @returns {Boolean}
     */
    hasModel() {
        return (this.model instanceof MantraModel);
    };

};