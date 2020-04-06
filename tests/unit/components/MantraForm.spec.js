import 'jest-extended';
import { shallowMount } from '@vue/test-utils';
import { installMantra } from '../../helpers/setup';
import MantraFormComponent from '../../../lib/components/MantraForm/index.vue';
import MantraForm from '../../../lib/core/components/MantraForm';
import { getPathFromObject, pushToRouteParams } from '../../../lib/components/MantraForm/utils';

const mockMantraData = {
    name: 'pepe',
    path: 'pepe.5',
    schema: 'pepe',
    id: '5',
    parents: [],
    component: null,
    action: '',
    context: '',
    endpoint: '',
    _path: ''
};
const MantraDataProperties = Object.keys(mockMantraData);

function renderShallowComponent(options = null) {
    const mockOptions = options || {
        propsData: {
            config: {
                component: {
                    name: 'testingPepe',
                    _isValidComponent: () => (true)
                }
            }
        },
        stubs: {
            testingPepe: true
        }
    };
    const testingConfig = {
        components: {
            testingPepe: {
                props: ['config'],
                template: '<div>Pepe component</div>'
            },
            notFound: {
                template: '<div>404 not found</div>'
            }
        },
        schemas: {}
    };
    const { localVue } = installMantra({ config: testingConfig });
    const wrapper = shallowMount(MantraFormComponent, { localVue, ...mockOptions });

    return {
        wrapper,
        localVue
    };
};

const executeBeforeRouteEnter = function(wrapper, next = null, to = null) {
    const mockNext = next || jest.fn((to) => (to));
    const mockTo = to || {
        params: { 
            schema: 'pepe', 
            id: '5'
        } 
    };

    MantraFormComponent.beforeRouteEnter.call(wrapper.vm, mockTo, undefined, mockNext);

    return {
        to: mockTo,
        next: mockNext
    };
};

describe('MantraForm (Vue)', () => {
    describe('Utilities', () => {
        describe('getPathFromObject', () => {
            it('should be a function', () => {
                expect(getPathFromObject).toBeFunction();
            });

            it('should return a string concat by dots when pass an `object` with props', () => {
                const testInput = { name: 'pepe', id: 5, age: 12 };
                const expectedValue = 'pepe.5.12';
    
                expect(getPathFromObject(testInput)).toBe(expectedValue);
            });
    
            it('should return an error when pass an `undefined` value', () => {
                const testInput = undefined;
                expect(() => (getPathFromObject(testInput))).toThrowError();
            });
    
            it('should return an error when pass a `null` value', () => {
                const testInput = null;
                expect(() => (getPathFromObject(testInput))).toThrowError();
            });
    
            it('should return an error when pass a `number` value', () => {
                const testInput = 12;
                expect(() => (getPathFromObject(testInput))).toThrowError();
            });
    
            it('should return an error when pass a `Function` value', () => {
                const testInput = new Function();
                expect(() => (getPathFromObject(testInput))).toThrowError();
            });
    
            it('should return an error when pass a `Map` value', () => {
                const testInput = new Map();
                expect(() => (getPathFromObject(testInput))).toThrowError();
            });
    
            it('should return an error when pass a `Set` value', () => {
                const testInput = new Set();
                expect(() => (getPathFromObject(testInput))).toThrowError();
            });
    
            it('should return an error when pass a `boolean` value', () => {
                let testInput = new Boolean();
                expect(() => (getPathFromObject(testInput))).toThrowError();
    
                testInput = new Boolean(1);
                expect(() => (getPathFromObject(testInput))).toThrowError();
            });
    
            it('should return an error when pass a `string` value', () => {
                const testInput = 'hola';
                expect(() => (getPathFromObject(testInput))).toThrowError();
            });
        });
    
        describe('pushToParams', () => {
            it('should be a function', () => {
                expect(pushToRouteParams).toBeFunction();
            });
        });
    });
    
    describe('Functional component (render)', () => {
        afterEach(() => {
            jest.resetModules();
        });

        describe('beforeRouteEnter (Route Guard)', () => {
            const spyConsoleError = jest.spyOn(console, 'error').mockImplementation((val) => (val));
            const spyGetConfig = jest.spyOn(MantraForm, '_getConfig');

            beforeEach(() => {
                spyConsoleError.mockClear();
                spyGetConfig.mockReset();
            });

            it('should redirect to `*` when an error is catched', async () => {
                spyGetConfig.mockImplementation(() => { throw new Error(); });

                const { wrapper } = renderShallowComponent();
                const { next } = executeBeforeRouteEnter(wrapper);
                await wrapper.vm.$nextTick();

                expect(next).toHaveBeenCalled();
                expect(next).toHaveBeenCalledWith('*');
            });

            it('should redirect to `render` method with `config` in the route params', async () => {
                spyGetConfig.mockReturnValue(mockMantraData);

                const { wrapper } = renderShallowComponent();
                const { to } = executeBeforeRouteEnter(wrapper);
                await wrapper.vm.$nextTick();

                expect(to.params).toContainKey('config');
                expect(to.params.config).toContainAllKeys(MantraDataProperties);
            });
        });

        it('should render a component when a valid `component` is pass through `context.props`', () => {
            const { wrapper } = renderShallowComponent();
            expect(wrapper.find({ name: 'testingPepe' }).exists()).toBeTrue();
        });

        it('should render a component with a `config` object prop when a valid `component` is pass through `context.props`', () => {
            const { wrapper } = renderShallowComponent();
            expect(wrapper.find({ name: 'testingPepe' }).props()).toContainKey('config');
            expect(wrapper.find({ name: 'testingPepe' }).props().config).toBeObject();
        });

        it('should render the 404 component when a invalid `component` is pass through `context.props`', () => {
            const { wrapper } = renderShallowComponent({
                propsData: {
                    config: {
                        component: {
                            name: 'testingPepe',
                            _isValidComponent: () => (false)
                        }
                    }
                },
                stubs: {
                    notFound: true
                }
            });
            
            expect(wrapper.find({ name: 'notFound' }).exists()).toBeTrue();
        });
    });
});
