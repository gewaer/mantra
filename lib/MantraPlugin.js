class Mantra {
    constructor() {
        this.store = null;
    }

    setConfig({ store }) {
        this.store = store;
    }

    getConfig() {
        return this;
    }

    getSchemasModule() {
        return this.store.state.schemas;
    }
}

export let MantraPlugin = new Mantra();