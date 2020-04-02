import has from 'lodash/has';
import get from 'lodash/get';

import { MantraPlugin } from './../MantraPlugin';
import { error } from './../utils';

const name = 'store';

const MIXIN = {
    $fm_store: { name },
    beforeCreate() {},
    provide() {},
    created() {
        this.__setStates();
        this.initState(this.config);
    },
    computed: {},
    methods: {
        async initState(data) {
            // eslint-disable-next-line no-unused-vars
            const store = await this.getStore(data);
        },
        // STORE RELATED
        async getStore(data) {
            if (this.isNewStore(data)) {                
                return this.initStore(data);
            }
            return this._handleNonNewStore(data);
        },
        async initStore(data) {
            const request = this.createRequest(data);
            const { alias:name } = data; 
            const requestObject = { name, request };
            this.registerRequest(requestObject);
            return this.getPendingRequest(data);
        },
        async _getStoreData(data) {
            if (!data.needFetch) {
                return {};
            }
            return this.fetchData(data);
        },
        fetchData(data) {
            const HttpClient = MantraPlugin.getHttpClient.call(this);
            const { endpoint } = data;
            return HttpClient.get(endpoint).then((response) => {
                return response.data;
            }).catch((e) => {
                error(e);
            });
        },
        _handleNonNewStore(data) {
            if (this._getStoreStatus(data) === 'PENDING') {
                return this.getPendingRequest(data);
            }
            return this.getExistingStore(data);
        },
        getExistingStore(data) {
            return get(this.mantra.store, data.storePath);
        },
        // STORE BOOLEANS / STATUS
        _getStoreStatus(data) {
            if (this.doesStoreExists(data)) {
                return 'EXISTING';
            }
            if (this.isRequestPending(data)) {
                return 'PENDING';
            }
            return 'NEW';
        },
        isNewStore(data) {
            return (this._getStoreStatus(data) === 'NEW');
        },
        doesStoreExists(data) {
            return has(this.mantra.store, data.storePath);
        },
        // eslint-disable-next-line no-unused-vars
        setStore(store, data) {
            return store;
        },
        // REQUEST
        createRequest(data) {
            const { alias } = data;
            return this._getStoreData(data).then((value) => {
                const store = this._getSource(value, data);
                return this.setStore(store, data);
            }).catch((e) => {
                error(e);
            }).finally(() => {
                this.deregisterRequest(alias);
            });
        },
        registerRequest(requestObject) {
            this.mantra.requests = [ ...this.mantra.requests, requestObject ];
        },
        deregisterRequest(alias) {
            this.mantra.requests = this.mantra.requests.filter(request => request.name !== alias);
        },
        getPendingRequest(data) {
            return this.mantra.requests.find(request => request.name === data.alias).request;
        },
        // SOURCE RELATED
        async _getSource(value, data) {
            return { value, data };
        },
        // CONFIG RELATED
        async _getConfig(value, data) {
            return { value, data };
        },
        // STATE RELATED
        _handleNonNewState(data) {
            if (this._getStateStatus(data) === 'PENDING') {
                return this.getPendingRequest(data);
            }
            return this.getExistingState(data);
        },
        _getStateStatus(data) {
            if (this.doesStateExists(data)) {
                return 'EXISTING';
            }
            if (this.isRequestPending(data)) {
                return 'PENDING';
            }
            return 'NEW';
        },
        getExistingState(data) {
            return get(this.mantra.store, data.statePath);
        },
        // STATE BOOLEANS
        isNewState(data) {
            return (this._getStateStatus(data) === 'NEW');
        },
        isRequestPending(data) {
            const IS_REQUEST_EMPTY = (this.mantra.requests.length > 0);
            return IS_REQUEST_EMPTY && (this.mantra.requests.findIndex(request => request.name === data.alias) !== -1);
        },
        // ROOT / CHILD STRATEGY
        __setStates(){
            if (!this.isRoot) return;
            this.r_setStates();
        },
        r_setStates(){
            this.mantra = {
                ...this.mantra,
                store: {},
                requests: [],
            }; 
        },
    },
};

export default MIXIN;
