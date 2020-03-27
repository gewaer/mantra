import 'jest-extended';
import Vuex from 'vuex';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import { MantraPlugin } from '../../lib/MantraPlugin';
import Mantra, { componentsRegistration, install, isEmptyObject, isObject, isOptionsValid, isTruthy, isValidSchema, isValidStore, registerStoreModule } from '../../Mantra';

describe('Mantra.js module', () => {
	it('should export a function', () => {
		expect(Mantra).toBeInstanceOf(Function);
	});

	it('should export a function call `install`', () => {
		expect(Mantra.name).toEqual('install');
	});

	describe('isTruthy', () => {

		it('should be a function', () => {
			expect(isTruthy).toBeInstanceOf(Function);
		});

		it('should return `true` for truthy values', () => {
			expect(isTruthy('hola')).toBeTrue();
			expect(isTruthy(3)).toBeTrue();
			expect(isTruthy(true)).toBeTrue();
			expect(isTruthy({})).toBeTrue();
			expect(isTruthy([])).toBeTrue();
			expect(isTruthy(new Function())).toBeTrue();
		});

		it('should return `false` for falsy values', () => {
			expect(isTruthy('')).toBeFalse();
			expect(isTruthy(false)).toBeFalse();
			expect(isTruthy(0)).toBeFalse();
			expect(isTruthy(null)).toBeFalse();
			expect(isTruthy(undefined)).toBeFalse();
		});
	});

	describe('isObject', () => {

		it('should be a function', () => {
			expect(isObject).toBeInstanceOf(Function);
		});

		it('should return `true` for object values', () => {
			expect(isObject({ pepe: 5, rodrigo: 6 })).toBeTrue();
			expect(isObject(new Object(null))).toBeTrue();
		});

		it('should return `false` for non-object values', () => {
			expect(isObject([])).toBeFalse();
			expect(isObject(2)).toBeFalse();
			expect(isObject('hola')).toBeFalse();
			expect(isObject(true)).toBeFalse();
			expect(isObject(new Function())).toBeFalse();
			expect(isObject(new Map())).toBeFalse();
			expect(isObject(new Set())).toBeFalse();
			expect(isObject(new Promise(() => true))).toBeFalse();
		});
	});

	describe('isEmptyObject', () => {

		it('should be a function', () => {
			expect(isEmptyObject).toBeInstanceOf(Function);
		});

		it('should return `true` for an object with no properties', () => {
			expect(isEmptyObject({})).toBeTrue();
		});

		it('should return `false` for an object with properties', () => {
			expect(isEmptyObject({ pepe: 'hola' })).toBeFalse();
		});
	});

	describe('isValidSchema', () => {
		it('should be a function', () => {
			expect(isValidSchema).toBeInstanceOf(Function);
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

	describe('isValidStore', () => {
		it('should be a function', () => {
			expect(isValidStore).toBeInstanceOf(Function);
		});

		it('should return `true` for a non-empty lib property of an object', () => {
			const store = { lib: { pepe: true } };

			expect(isValidStore(store)).toBeTrue();
		});

		it('shoud return `false` for an empty lib property of an object', () => {
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

	describe('isOptionsValid', () => {
		const validOptions = {
			config: { schemas: {} },
			plugins: { store: { lib: { pepe: 'random-value' } } }
		};

		it('should be a function', () => {
			expect(isOptionsValid).toBeInstanceOf(Function);
		});

		it('should return `valid: true` for a valid schema and a valid store', () => {
			expect(isOptionsValid(validOptions)).toMatchObject({ valid: true });
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
		let localVue = createLocalVue();
		let vuex = null;
		localVue.use(Vuex);
		
		beforeEach(() => {
			localVue = createLocalVue();
			vuex = new Vuex.Store({
				state: {},
				getters: {},
				mutations: {},
				actions: {}
			});
		});

		describe('componentsRegistration', () => {
			it('should be a function', () => {
				expect(componentsRegistration).toBeInstanceOf(Function);
			});

			it('should register components in the vue instance', () => {
				const test = {
					template: '',
				};
				const dummy = {
					templte: ''
				}

				componentsRegistration(localVue, { test, dummy });
				
				const wrapper = shallowMount({
					template: '<div><test/><dummy/></div>'
				}, { localVue });

				expect(wrapper.find({ name: 'test' }).exists()).toBeTrue();
				expect(wrapper.find({ name: 'dummy' }).exists()).toBeTrue();
			});

			it('should throw exception when `components` is a falsy value', () => {
				expect(() => (componentsRegistration(localVue, null))).toThrowError('Mantra installation expects Vue components in its config parameter');
				expect(() => (componentsRegistration(localVue, undefined))).toThrowError('Mantra installation expects Vue components in its config parameter');
				expect(() => (componentsRegistration(localVue, false))).toThrowError('Mantra installation expects Vue components in its config parameter');
				expect(() => (componentsRegistration(localVue, 0))).toThrowError('Mantra installation expects Vue components in its config parameter');
				expect(() => (componentsRegistration(localVue, ''))).toThrowError('Mantra installation expects Vue components in its config parameter');
			});

			it('should throw exception when `components` is a non-object value', () => {
				expect(() => (componentsRegistration(localVue, []))).toThrowError('Mantra installation expects Vue components in its config parameter');
				expect(() => (componentsRegistration(localVue, new Function()))).toThrowError('Mantra installation expects Vue components in its config parameter');
				expect(() => (componentsRegistration(localVue, new Map()))).toThrowError('Mantra installation expects Vue components in its config parameter');
				expect(() => (componentsRegistration(localVue, new Set()))).toThrowError('Mantra installation expects Vue components in its config parameter');
			});
		});

		describe('registerStoreModule (Vuex Store)', () => {
			let options = { 
				schemas: { 
					dummyValue: 'module has been setted' 
				} 
			};

			it('should be a function', () => {
				expect(registerStoreModule).toBeInstanceOf(Function);
			});

			it('should register the schemas module into store', () => {
				const storePlugin = registerStoreModule({ lib: vuex, config: {} }, options);
				expect(storePlugin.state).toMatchObject(options);
			});

			it('should register the schemas module into store if `config` is not passed', () => {
				const storePlugin = registerStoreModule({ lib: vuex }, options);
				expect(storePlugin.state).toMatchObject(options);
			});
		});

		describe('install', () => {
			const spyConsoleError = jest.spyOn(console, 'error').mockImplementation((message) => (message));
			let plugins = null;

			beforeEach(() => {
				plugins = { 
					store: { lib: vuex, config: {} } 
				};
			});

			it('should be a function', () => {
				expect(install).toBeInstanceOf(Function);
			});

			it('should log a reason if `options.schemas` is not valid', () => {
				install(localVue, { plugins, config: { components: {} } });
				expect(spyConsoleError).toBeCalled();
				expect(spyConsoleError).toBeCalledWith('[mantra]: Schemas property must be an object');
			});

			it('should log a reason if `options.store` is not valid', () => {
				install(localVue, { plugins: {}, config: { schemas: {}, components: {} } });
				expect(spyConsoleError).toBeCalled();
				expect(spyConsoleError).toBeCalledWith('[mantra]: Store library must be provided');
			});

			it('should log an error if `config.components` is falsy', () => {
				install(localVue, { plugins, config: { schemas: {}, components: null } });
				expect(spyConsoleError).toBeCalledTimes(1);
				expect(spyConsoleError).toBeCalledWith('[mantra]: Mantra installation expects Vue components in its config parameter');
				
				install(localVue, { plugins, config: { schemas: {}, component: undefined } });
				expect(spyConsoleError).toBeCalledTimes(2);
				expect(spyConsoleError).toBeCalledWith('[mantra]: Mantra installation expects Vue components in its config parameter');

				install(localVue, { plugins, config: { schemas: {}, component: 0 } });
				expect(spyConsoleError).toBeCalledTimes(3);
				expect(spyConsoleError).toBeCalledWith('[mantra]: Mantra installation expects Vue components in its config parameter');

				install(localVue, { plugins, config: { schemas: {}, component: false } });
				expect(spyConsoleError).toBeCalledTimes(4);
				expect(spyConsoleError).toBeCalledWith('[mantra]: Mantra installation expects Vue components in its config parameter');

				install(localVue, { plugins, config: { schemas: {}, component: '' } });
				expect(spyConsoleError).toBeCalledTimes(5);
				expect(spyConsoleError).toBeCalledWith('[mantra]: Mantra installation expects Vue components in its config parameter');
			});

			it('should log an error if `config.components` is not an object', () => {
				const options = { plugins, config: { schemas: {} } };

				install(localVue, { ...options, config: { ...options.config, component: [] } });
				expect(spyConsoleError).toBeCalledTimes(1);
				expect(spyConsoleError).toBeCalledWith('[mantra]: Mantra installation expects Vue components in its config parameter');
				
				install(localVue, { ...options, config: { ...options.config, component: 'hola' } });
				expect(spyConsoleError).toBeCalledTimes(2);
				expect(spyConsoleError).toBeCalledWith('[mantra]: Mantra installation expects Vue components in its config parameter');

				install(localVue, { ...options, config: { ...options.config, component: 55 } });
				expect(spyConsoleError).toBeCalledTimes(3);
				expect(spyConsoleError).toBeCalledWith('[mantra]: Mantra installation expects Vue components in its config parameter');

				install(localVue, { ...options, config: { ...options.config, component: new Function() } });
				expect(spyConsoleError).toBeCalledTimes(4);
				expect(spyConsoleError).toBeCalledWith('[mantra]: Mantra installation expects Vue components in its config parameter');

				install(localVue, { ...options, config: { ...options.config, component: new Map() } });
				expect(spyConsoleError).toBeCalledTimes(5);
				expect(spyConsoleError).toBeCalledWith('[mantra]: Mantra installation expects Vue components in its config parameter');

				install(localVue, { ...options, config: { ...options.config, component: new Set() } });
				expect(spyConsoleError).toBeCalledTimes(6);
				expect(spyConsoleError).toBeCalledWith('[mantra]: Mantra installation expects Vue components in its config parameter');
			});

			it('should register the `store` into MantraPlugin', () => {
				const spySetConfig = jest.spyOn(MantraPlugin, 'setConfig').mockImplementation((value) =>  (value));

				install(localVue, { plugins, config: { schemas: {}, components: {} } });
				expect(spySetConfig).toBeCalled();
				expect(spySetConfig).toBeCalledWith({ store: vuex });
			});

			afterEach(() => {
				jest.clearAllMocks();
			});
		});
	});
});