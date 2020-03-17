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
     * Verify if a component has a valid mixin type.
     * @param {object} vue - A Vue instance.
     * @returns {boolean} - True if the vue component mixin has the _mixin type.
     */
    _isValidComponent(vue) {
        const component = vue.$root.$options.components[this.name];
        const mixinType = component.options.$m_mixin;
        return mixinType === this._mixin;
    };
};