/** Base class representing all MantraComponent classes. */
export default class MantraComponent {
    /**
     * Creates a base MantraComponent class.
     * @param {object} payload - The values of the class properties.
     */
    constructor({ name, mixin }) {
        this.name = name;
        this._mixin = mixin;
    }

    /**
     * Verify a component has a MantraForm mixin.
     * @param {object} component - A vue component object.
     * @returns {boolean} True if component has the MantraForm mixin.
     */
    isValidComponent(component) {
        return (component._mixin === 'MantraForm') ? true : false;
    }
};