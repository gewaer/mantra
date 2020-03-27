import has from 'lodash/has';
import get from 'lodash/get';

import { MantraPlugin } from './../MantraPlugin';
import { error } from './../utils';

const name = 'store';
const prefix = `$fm_${name}`;

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
            const value = await this._getInitState(data);
            const source = await this._getSource(data);
            return this.setStore({ value, source }, data);
        },
        // STATE RELATED
        _getInitState(data) {
            if (this.isNewState(data)) {                
                return this._initState(data);
            }
            return this._handleNonNewState(data);
        },
        async _initState(data) {
            if (!data.needFetch) {
                return {};
            }
            return this._getNewState(data);
        },
        _getNewState(data) {
            const request = this.createRequest(data);
            const { alias:name } = data; 
            const requestObject = { name, request };
            this.registerRequest(requestObject);
            return this.getPendingRequest(data);
        },
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
        // REQUEST
        createRequest(data) {
            const HttpClient = MantraPlugin.getHttpClient.call(this);
            const { endpoint, alias } = data;

            return new Promise((resolve, reject) => {
                HttpClient.get(endpoint).then((response) => {
                    resolve(response.data);
                }).catch((e) => {
                    reject(e);
                    error(e);
                }).finally(() => {                    
                    this.deregisterRequest(alias);
                });
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
        async _getSource(data) {},
        setStore(state, data) {},
        // BOOLEANS
        isNewState(data) {
            return (this._getStateStatus(data) === 'NEW');
        },
        doesStateExists(data) {
            return has(this.mantra.store, data.statePath);
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
