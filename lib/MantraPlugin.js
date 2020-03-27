/**
 * Class representing the Mantra plugin object.
 */
class Mantra {
    /**
     * Creates a default Mantra plugin object.
     */
    constructor() {
        this.store = null;
        this.httpClient = null;
    }

    /**
     * Sets the store property of the MantraPlugin object.
     * @param {object} payload - Contains information of the store property.
     */
    setConfig({ store, httpClient }) {
        this.store = store;
        this.httpClient = httpClient;
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

     /**
     * Retrieve the inner httpClient method to bind Vue in order to resolve a HttpClient library
     * @returns {Function} - The method to bind Vue and get a valid HttpClient library
     */
    get getHttpClient() {
        return this.httpClient._get
    }

}

export let MantraPlugin = new Mantra();