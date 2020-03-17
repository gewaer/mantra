/**
 * Class representing the Mantra plugin object.
 */
class Mantra {
    /**
     * Creates a default Mantra plugin object.
     */
    constructor() {
        this.store = null;
    }

    /**
     * Sets the store property of the MantraPlugin object.
     * @param {object} payload - Contains information of the store property.
     */
    setConfig({ store }) {
        this.store = store;
    }

    /**
     * Get the MantraPlugin instance.
     * @returns {Mantra} - The MantraPlugin instance.
     */
    getConfig() {
        return this;
    }

    /**
     * Get the schemas module inside MantraPlugin's store.
     * @returns {object} - The schemas module.
     */
    getSchemasModule() {
        return this.store.state.schemas;
    }
}

export let MantraPlugin = new Mantra();