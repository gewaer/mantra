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
};