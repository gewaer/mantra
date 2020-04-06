import Vuex from 'vuex';
import { createLocalVue } from '@vue/test-utils';
import Mantra from '../../index';

const createDefaultTestingStore = function (Vue) {
    Vue.use(Vuex);

    return new Vuex.Store({
        state: {},
        getters: {},
        mutations: {},
        actions: {}
    });
};

const installMantra = function({ vue = null, config, store }) {
    const localVue = vue || createLocalVue();
    const testStore = store || createDefaultTestingStore(localVue);
    const testingOptions = {
        plugins: {
            store: {
                lib: testStore,
                config: {}
            }
        },
        config: { ...config }
    };
    localVue.use(Mantra, testingOptions);
    return {
        localVue,
        localStore: testStore
    };
};

export { createDefaultTestingStore, installMantra };