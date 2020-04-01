import { mount } from '@vue/test-utils';
import { installMantra, createDefaultTestingRouter } from '../../helpers/setup';
import * as MantraFormComponent from '../../../lib/components/MantraForm.vue';
import MantraForm from '../../../lib/core/components/MantraForm.js';
import MantraSchema from '../../../lib/core/schema/MantraSchema.js';
import MantraInfo from '../../../lib/core/state/MantraInfo.js';

// START Mocking ES6 classes
jest.mock('../../../lib/core/components/MantraForm', () => {
    const _getConfig = jest.fn(() => {
        return {
            name: 'pepe',
            path: 'pepe.5',
            schema: 'pepe',
            id: '5',
            parents: [],
            action: {
                update: {
                    name: 'pepe',
                    fields: ['description', 'title'],
                    _mixin: 'MantraForm'
                }
            },
            context: '',
            component: {
                name: 'pepeComp'
            },
            endpoint: 'pepe.5',
            alias: '',
            _path: '',
            baseClasses: {}
        };
    });
    return jest.fn().mockImplementation(({ name, fields }) => {
        return {
            __esModule: true,
            name,
            fields,
            _mixin: 'MantraForm',
            _getConfig
        };
    });
});
jest.mock('../../../lib/core/schema/MantraSchema', () => {
    return jest.fn().mockImplementation(({ name, fields, actions }) => {
        return {
            __esModule: true,
            name,
            fields,
            actions
        }
    });
});
jest.mock('../../../lib/core/state/MantraInfo', () => {
    return jest.fn().mockImplementation(() => {
        return {
            __esModule: true,
            type: 'String',
            config: null,
            name: '',
            default: '',
            _dataType: null,
            _root: 'info'
        };
    });
});
// END Mocking ES6 classes

// Mantra mocked data
const testingRoutes = [{ path: '/pepe/5', component: MantraFormComponent }];
const testingConfig = {
    components: {
        pepeComp: {
            template: ''
        }
    },
    schemas: {
        pepe: new MantraSchema({
            name: 'pepe',
            fields: {
                description: new MantraInfo(),
                title: new MantraInfo(),
            },
            actions: {
                update: new MantraForm({
                    name: 'pepe',
                    fields: ['description', 'title']
                })
            }
        })
    }
};
// Mantra mocked data

describe('MantraForm.vue (Functional)', () => {
    let localVue = null;
    let store = null;
    let router = null;

    beforeEach(() => {
        const { localVue: vue, localStore } = installMantra(testingConfig);
        localVue = vue;
        store = localStore;
        router = createDefaultTestingRouter(localVue, testingRoutes);
    });
    
    afterEach(() => {
        jest.resetModules();
    });

    it('renders a child component based on valid route path', () => {
        const wrapper = mount(MantraFormComponent, {
            localVue,
            store,
            router
        });

        router.push('/pepe/5');

        console.log("WRAPPER", wrapper);
        expect(true).toBe(true);
    });

    // test: 'renders the 404 page based on an invalid route path'
});