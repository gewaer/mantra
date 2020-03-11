import MantraComponent from './MantraComponent';
import MantraData from './../MantraData';

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
    }

    /**
     * Get the config of a MantraForm component.
     * @param {object} payload - Contains the path and config for MantraData creation.
     * @returns {MantraData} The MantraForm component config.
     */
    static _getConfig({ path }) {
        const config = new MantraData({ path, baseClass: 'MantraForm' });
        config.setBase();
        config.setRecord();
        config.setAction();
        config.setComponent();
        
        return config;
    };
};