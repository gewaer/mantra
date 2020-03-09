import { MantraPlugin } from './../MantraPlugin';

/**
 * Class representing a common configuration for MantraComponents.
 */
export default class MantraData {
    /**
     * Creates a MantraData object with default value in properties.
     */
    constructor({ path }) {
        this.path = '';
        this.component = null;
        this.parent = [];
        this.name = '';
        this.schema = null;
        this.id = '';
        this.action = '';
        this._path = path;
    };

    /**
     * Sets the class name and schema property to the entity's name and schema.
     * @param {string} name - The entity's name.
     */
    setBase(path) {
        if (!this._isSchema(path)) {
            // PENDING - ERRORS constant usage
            return;
        }

        const name = MantraData.getFirstPath(path);
        this._setName(name);
        this._setBaseSchema(name);
    };

    /**
     * Sets the class name property to the entity's name.
     * @param {string} name - The entity's name.
     */
    _setName(name) {
        this.name = name;
    };

    /**
     * Verify the existence of the path schema in the store.
     * @param {string} path - The path joined by dots.
     * @returns {boolean} True if the schema exists in the store.
     */
    _isSchema(path) {
        const name = MantraData.getFirstPath(path);
        const schemas = MantraPlugin.getSchemasModule();

        if (schemas.hasOwnProperty(name)) return true;
        else false;
    };

    /**
     * Sets the class schema property to the entity's schema object.
     * @param {string} schema - The entity's schema object.
     */
    _setBaseSchema(schema) {
        const schemas = MantraPlugin.getSchemasModule();
        this.schema = schemas[schema];
    };

    setRecord() {
        // for(const )
    };

    updatePath(path) {
        this._updatePath(path);
        this._trimPath(path);
    };

    _updatePath(path) {
        const IS_FIRST_PATH = (this.path === '');
        const separator = (IS_FIRST_PATH) ? '' : '.';
        this.path = this.path.concat(separator, path);
    };

    _trimPath(path) {
        // USE THE REPLACE STRING METHOD
    };

    /**
     * Split the path by dots and return the first member.
     * @param {string} path - The path joined by dots.
     * @returns {string} The first member of the path.
     */
    static getFirstPath(path) {
        return path.split('.')[0];
    };
}