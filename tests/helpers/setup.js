import VueRouter from 'vue-router';
import Vuex from 'vuex';
import { createLocalVue } from '@vue/test-utils';
import Mantra from '../../index';

const createDefaultTestingRouter = function (Vue, testRoutes) {
    Vue.use(VueRouter);
    return new VueRouter(testRoutes);
};

const createDefaultTestingStore = function (Vue) {
    Vue.use(Vuex);

    return new Vuex.Store({
        state: {},
        getters: {},
        mutations: {},
        actions: {}
    });
};

const installMantra = function(testingConfig) {
    const localVue = createLocalVue();
    const store = createDefaultTestingStore(localVue);
    const testingOptions = {
        plugins: {
            store: {
                lib: store,
                config: {}
            }
        },
        config: { ...testingConfig }
    };
    localVue.use(Mantra, testingOptions);
    return {
        localVue,
        localStore: store
    };
};

export { createDefaultTestingStore, createDefaultTestingRouter, installMantra };