import { MantraPlugin } from './../MantraPlugin';

/*
    This function is meant to be used as utilities for ID property validation.
*/
const IS_ID_NUMBER = (value) => {
    const num_value = Number(value);
    const isNaN = Number.isNaN(num_value);
    const isNull = (value === null);
    return !isNaN && !isNull;
};

/**
 * Class representing a common configuration for MantraComponents.
 */
export default class MantraData {
    /**
     * Creates a MantraData object with default value in properties.
     */
    constructor({ path, baseComponent }) {
        this.path = '';
        this.baseComponent = new baseComponent();
        this.component = null;
        this.parents = [];
        this.name = '';
        this.schema = null;
        this.id = '';
        this.action = '';
        this._path = path;
    };

    /**
     * Sets the name and schema property to the value of the entity in the _path property.
     * Updates the path property and trimms the _path property.
     */
    setBase() {
        if (!this._isSchema(this._path)) {
            // PENDING - ERRORS constant usage
            return;
        }

        const name = MantraData.getFirstPath(this._path);
        this._setName(name);
        this._setBaseSchema(name);
        this.updatePath(name);
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
     * @param {string} schema - The entity's schema name.
     */
    _setBaseSchema(schema) {
        const schemas = MantraPlugin.getSchemasModule();
        this.schema = schemas[schema];
    };

    /**
     * Set the id property and may re-set the schema, name and id property.
     */
    setRecord() {
        const pathToIterate = this._path.split('.');

        for (const name of pathToIterate) {
            if (this._isRelationship(name)) {
                this._setRelationship(name);
                continue;
            }
            
            if (this._isId(name)) {
                this._setId(name);
                continue;
            }

            break;
        }
    };

    /**
     * Verify the existence of the relationship name inside the schema property.
     * @param {string} name - The relationship name to be validated.
     * @returns {boolean} True if the relationship name exists in the schema property.
     */
    _isRelationship(name) {
        const relationships = this.schema.relationships;
        return relationships.some((rel) => rel.name === name);
    };

    /**
     * Re-sets the name, schema and id property.
     * Appends the parentEntity object to the parent property.
     * Updates the path property and trimms the _path property.
     * @param {string} name - The relationship name.
     */
    _setRelationship(name) {
        const parentEntity = { schema: this.schema, name: this.name, id: this.id };
        this._addParent(parentEntity);
        this._setName(name);
        this._setRelationshipSchema(name);
        this._resetId();
        this.updatePath(name);
    };

    /**
     * Set the schema property to the returned relationship.
     * @param {string} name - The relationship name.
     */
    _setRelationshipSchema(name) {
        const relationships = this.schema.relationships;
        this.schema = relationships.find((rel) => rel.name === name);
    }

    /**
     * Verify if the value parameter is a valid id.
     * @param {string} value - The id to be validated.
     * @returns {boolean} True if the relationship name exists in the schema property.
     */
    _isId(value) {
        return IS_ID_NUMBER(value);
    };

    /**
     * Set the id property to the id parameter.
     * Updates the path property and trimms the _path property.
     * @param {string} id - The id value.
     */
    _setId(id) {
        this.id = id;
        this.updatePath(name);
    };

    /**
     * Sets the id property to it's initial value.
     */
    _resetId() {
        this.id = '';
    }

    /**
     * Append the previous entity object to the parents property.
     * @param {string} entity - The previous entity object.
     */
    _addParent(entity) {
        this.parents.push(entity);
    }

    /**
     * Calls methods to trim the "_path" and append to "path" property.
     * @param {string} path - The path string to be updated and trimmed.
     */
    updatePath(path) {
        this._updatePath(path);
        this._trimPath(path);
    };

    /**
     * Concatanate with a dot the path parameter value to the path property.
     * @param {string} path - The path string to be concatenated.
     */
    _updatePath(path) {
        const IS_PATH_EMPTY = (this.path === '');
        const separator = (IS_PATH_EMPTY) ? '' : '.';
        this.path = this.path.concat(separator, path);
    };

    /**
     * Removes from the _path property the path parameter value.
     * @param {string} path - The path value to remove from the _path property.
     */
    _trimPath(path) {
        // Matches the word of the path whether it has a "." or not.
        const pathRegEx = new RegExp(`(${path}).?`, 'g');
        this.path = this.path.replace(pathRegEx, '');
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