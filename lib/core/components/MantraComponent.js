/** Base class representing all MantraComponent classes. */
export default class MantraComponent {
    /**
     * Creates a base MantraComponent class.
     * @param {object} payload - The values of the class properties.
     */
    constructor({ name, mixin }) {
        this.name = name;
        this._mixin = mixin;
    };

    /**
     * Verify a component has a MantraForm mixin.
     * @param {object} vue - A VueComponent instance.
     * @returns {boolean} True if the vue component has the MantraForm mixin.
     */
    _isValidComponent(vue) {
        return (vue._mixin === this._mixin);
    };
};