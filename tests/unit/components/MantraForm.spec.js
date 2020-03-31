import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Mantra from '../../../index';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import * as Component from '../../../lib/components/MantraForm.vue';
import { MantraForm } from '../../../lib/core/components';
import { MantraSchema } from '../../../lib/core/schema';
import { MantraInfo } from '../../../lib/core/state';

/* 
    To-do for testing
    1. Vuex install into localVue with a basic configuration [done]
    2. Mantra install as a plugin in localVue (with valid configuration) [done]
    3. VueRouter install as a plugin in localVue (with a route that matches Mantra schema) [done]
*/

describe('MantraForm.vue (Functional)', () => {
    let wrapper = null;
    const localVue = createLocalVue();
    localVue.use(Vuex);
    const store = new Vuex.Store({
        state: {},
        getters: {},
        mutations: {},
        actions: {}
    });

    const options = {
        plugins: {
            store: {
                lib: store,
                config: {}
            }
        },
        config: {
            components: {
                pepe: {
                    template: ''
                }
            },
            schemas: {
                pepe: new MantraSchema({
                    name: 'pepe',
                    fields: {
                        description: new MantraInfo({
                            type: 'String',
                        }),
                        title: new MantraInfo({
                            type: 'String',
                        }),
                    },
                    actions: {
                        update: new MantraForm({
                            name: 'pepe',
                            fields: ['description', 'title']
                        })
                    }
                })
            }
        }
    };
    console.log("OPTIONS", options.config.schemas.pepe);
    localVue.use(Mantra, options);

    localVue.use(VueRouter);
    const routes = [{ path: '/test/path', component: Component }];
    const router = new VueRouter(routes);

    beforeEach(() => {
        wrapper = shallowMount(Component, {
            localVue,
            router,
            store
        });
    });
    
    afterEach(() => {
        wrapper.destroy();
    });

    it('renders a child component based on valid route path', () => {});

    it('renders the 404 page based on an invalid route path', () => {});
});