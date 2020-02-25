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
}

export let MantraPlugin = new Mantra();