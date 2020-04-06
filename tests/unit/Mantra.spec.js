import 'jest-extended';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import { MantraPlugin } from '../../lib/MantraPlugin';
import { installMantra, createDefaultTestingStore } from '../helpers/setup';
import Mantra, { componentsRegistration, install, isOptionsValid, isValidSchema, isValidStore, registerStoreModule } from '../../Mantra';

describe('Mantra.js module', () => {
	it('should export a function', () => {
		expect(Mantra).toBeFunction();
	});

	it('should export a function call `install`', () => {
		expect(Mantra.name).toEqual('install');
	});

	describe('isValidSchema()', () => {
		it('should be a function', () => {
			expect(isValidSchema).toBeFunction();
		});

		it('should return `true` for object values', () => {
			expect(isValidSchema({})).toBeTrue();
			expect(isValidSchema({ pepe: 'hola' })).toBeTrue();
		});

		it('should return `false` for non-object values', () => {
			expect(isValidSchema(null)).toBeFalse();
			expect(isValidSchema(undefined)).toBeFalse();
			expect(isValidSchema(false)).toBeFalse();
			expect(isValidSchema(55)).toBeFalse();
			expect(isValidSchema('hola')).toBeFalse();
			expect(isValidSchema([])).toBeFalse();
			expect(isValidSchema(new Function())).toBeFalse();
		});
	});

	describe('isValidStore()', () => {
		it('should be a function', () => {
			expect(isValidStore).toBeFunction();
		});

		it('should return `true` for a non-empty lib property of a store object', () => {
			const store = { lib: { pepe: true } };

			expect(isValidStore(store)).toBeTrue();
		});

		it('shoud return `false` for an empty lib property of a store object', () => {
			const store = { lib: {} };
			expect(isValidStore(store)).toBeFalse();
		});

		it('should return `false` for empty object values', () => {
			const store = {};
			expect(isValidStore(store)).toBeFalse();
		});

		it('should return `false` for non-object values', () => {
			expect(isValidStore(null)).toBeFalse();
			expect(isValidStore(undefined)).toBeFalse();
			expect(isValidStore(false)).toBeFalse();
			expect(isValidStore('hi')).toBeFalse();
			expect(isValidStore(55)).toBeFalse();
			expect(isValidStore([])).toBeFalse();
			expect(isValidStore(new Function())).toBeFalse();
		});
	});

	describe('isOptionsValid()', () => {
		const validOptions = {
			config: { 
				schemas: {}
			},
			plugins: { 
				store: { 
					lib: { pepe: 'random-value' } 
				} 
			}
		};

		it('should be a function', () => {
			expect(isOptionsValid).toBeFunction();
		});

		it('should return `valid: true` for a valid schema and a valid store', () => {
			const expectedResult = { valid: true };
			expect(isOptionsValid(validOptions)).toMatchObject(expectedResult);
		});

		it('should return `valid: false` and a `reason` for an invalid schema', () => {
			const invalidSchemaOptions = { ...validOptions, config: {} };
			const expectedResult = { valid: false, reason: 'Schemas property must be an object' };
			
			expect(isOptionsValid(invalidSchemaOptions)).toMatchObject(expectedResult);
		});

		it('should return `valid: false` and a `reason` for an invalid store', () => {
			const invalidStoreOptions = { ...validOptions, plugins: { store: {} } };
			const expectedResult = { valid: false, reason: 'Store library must be provided' };
			
			expect(isOptionsValid(invalidStoreOptions)).toMatchObject(expectedResult);
		});
	});

	describe('Vue installation', () => {
        let localVue = null;
		
		beforeEach(() => {
            localVue = createLocalVue();
		});

		describe('componentsRegistration()', () => {
            const errorMsg = 'Mantra installation expects Vue components in its config parameter';
			it('should be a function', () => {
				expect(componentsRegistration).toBeFunction();
			});

			it('should register components in the vue instance', () => {
				const test = {
					template: '',
				};
				const dummy = {
					template: ''
				};

				componentsRegistration(localVue, { test, dummy });
				
				const wrapper = shallowMount({
					template: '<div><test/><dummy/></div>'
				}, { localVue });

				expect(wrapper.find({ name: 'test' }).exists()).toBeTrue();
				expect(wrapper.find({ name: 'dummy' }).exists()).toBeTrue();
			});

			it('should throw exception when `components` is a falsy value', () => {
				expect(() => (componentsRegistration(localVue, null))).toThrowError(errorMsg);
				expect(() => (componentsRegistration(localVue, undefined))).toThrowError(errorMsg);
				expect(() => (componentsRegistration(localVue, false))).toThrowError(errorMsg);
				expect(() => (componentsRegistration(localVue, 0))).toThrowError(errorMsg);
				expect(() => (componentsRegistration(localVue, ''))).toThrowError(errorMsg);
			});

			it('should throw exception when `components` is a non-object value', () => {
				expect(() => (componentsRegistration(localVue, []))).toThrowError(errorMsg);
				expect(() => (componentsRegistration(localVue, new Function()))).toThrowError(errorMsg);
				expect(() => (componentsRegistration(localVue, new Map()))).toThrowError(errorMsg);
				expect(() => (componentsRegistration(localVue, new Set()))).toThrowError(errorMsg);
			});
		});

		describe('registerStoreModule() (Vuex Store)', () => {
            let vuex = null;
			let options = { 
				schemas: { 
					dummyValue: 'module has been setted' 
				}
            };
            
            beforeEach(() => {
                vuex = createDefaultTestingStore(localVue);
            })

			it('should be a function', () => {
				expect(registerStoreModule).toBeFunction();
			});

			it('should register the schemas module into store', () => {
				const store = { lib: vuex, config: {} };
                const storePlugin = registerStoreModule(store, options);
                
				expect(storePlugin.state).toMatchObject(options);
			});

			it('should register the schemas module into store if `store.config` is not passed', () => {
				const store = { lib: vuex };
                const storePlugin = registerStoreModule(store, options);
                
				expect(storePlugin.state).toMatchObject(options);
			});
		});

		describe('install()', () => {
            const spyConsoleError = jest.spyOn(console, 'error').mockImplementation((message) => (message));

            beforeEach(() => {
                spyConsoleError.mockReset();
            });
        
			it('should be a function', () => {
				expect(install).toBeFunction();
			});

			it('should log a reason if `options.schemas` is not valid', () => {
                installMantra({ vue: localVue, config: { components: {} } });

				expect(spyConsoleError).toBeCalled();
				expect(spyConsoleError).toHaveBeenCalledWith('[mantra]: Schemas property must be an object');
			});

			it('should log a reason when `options.store` is not valid', () => {
                installMantra({ vue: localVue, store: 'pepe la anguila', config: { schemas: {}, components: {} } });

				expect(spyConsoleError).toHaveBeenCalled();
				expect(spyConsoleError).toHaveBeenCalledWith('[mantra]: Store library must be provided');
			});

            describe('Error log when `config.components` is falsy', () => {
                const errorMsg = '[mantra]: Mantra installation expects Vue components in its config parameter';

                test('Null', () => {
                    installMantra({ vue: localVue, tetsingConfig: { schemas: {}, components: null } });
    
                    expect(spyConsoleError).toHaveBeenCalled();
                    expect(spyConsoleError).toHaveBeenCalledWith(errorMsg);
                });
                test('Undefined', () => {
                    installMantra({ vue: localVue, config: { schemas: {}, component: undefined } });
    
                    expect(spyConsoleError).toHaveBeenCalled();
                    expect(spyConsoleError).toHaveBeenCalledWith(errorMsg);
                });
                test('Zero', () => {
                    installMantra({ vue: localVue, config: { schemas: {}, component: 0 } });
    
                    expect(spyConsoleError).toHaveBeenCalled();
                    expect(spyConsoleError).toHaveBeenCalledWith(errorMsg);
                });
                test('False', () => {
                    installMantra({ vue: localVue, config: { schemas: {}, component: false } });
    
                    expect(spyConsoleError).toHaveBeenCalled();
                    expect(spyConsoleError).toHaveBeenCalledWith(errorMsg);
                });
                test('String empty', () => {
                    installMantra({ vue: localVue, config: { schemas: {}, component: '' } });
    
                    expect(spyConsoleError).toHaveBeenCalled();
                    expect(spyConsoleError).toHaveBeenCalledWith(errorMsg);
                });
            });
            
            describe('Error log when `config.components` is not an object', () => {
                const errorMsg = '[mantra]: Mantra installation expects Vue components in its config parameter';
                const options = { config: { schemas: {} } };

                test('Array', () => {
                    installMantra({ vue: localVue, config: { ...options.config, component: [] } });
    
                    expect(spyConsoleError).toHaveBeenCalled();
                    expect(spyConsoleError).toHaveBeenCalledWith(errorMsg);
                });

                test('String', () => {
                    installMantra({ vue: localVue, config: { ...options.config, component: 'hola' } });
    
                    expect(spyConsoleError).toHaveBeenCalled();
                    expect(spyConsoleError).toHaveBeenCalledWith(errorMsg);
                });
                test('Number', () => {
                    installMantra({ vue: localVue, config: { ...options.config, component: 55 } });
    
                    expect(spyConsoleError).toHaveBeenCalled();
                    expect(spyConsoleError).toHaveBeenCalledWith(errorMsg);
                });
                test('Function', () => {
                    installMantra({ vue: localVue, config: { ...options.config, component: new Function() } });
                    
                    expect(spyConsoleError).toHaveBeenCalled();
                    expect(spyConsoleError).toHaveBeenCalledWith(errorMsg);
                });
                test('Map', () => {
                    installMantra({ vue: localVue, config: { ...options.config, component: new Map() } });
    
                    expect(spyConsoleError).toHaveBeenCalled();
                    expect(spyConsoleError).toHaveBeenCalledWith(errorMsg);
                });
                test('Set', () => {
                    installMantra({ vue: localVue, config: { ...options.config, component: new Set() } });
    
                    expect(spyConsoleError).toHaveBeenCalled();
                    expect(spyConsoleError).toHaveBeenCalledWith(errorMsg);
                });
            })

			it('should register the `store` into MantraPlugin', () => {
				const spySetConfig = jest.spyOn(MantraPlugin, 'setConfig').mockImplementation((value) =>  (value));
                const { localStore } = installMantra({ vue: localVue, config: { schemas: {}, components: {} } });
                
				expect(spySetConfig).toHaveBeenCalled();
				expect(spySetConfig).toHaveBeenCalledWith({ store: localStore });
			});

			afterEach(() => {
				jest.clearAllMocks();
			});
		});
	});
});