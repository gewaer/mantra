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

const createDefaultStoreConfig = function ({ localVue, config = {} }) {
  const defaultStore = createDefaultTestingStore(localVue)
  return {
    lib: defaultStore,
    config,
  }
};

const installMantra = function ({ vue = null, config, store }) {
  const localVue = vue || createLocalVue();
  const localStore = store || createDefaultStoreConfig({ localVue });
  const testingOptions = {
    plugins: {
      store: localStore
    },
    config: { ...config }
  };
  localVue.use(Mantra, testingOptions);
  return {
    localVue,
    localStore
  };
};

export { createDefaultTestingStore, installMantra };