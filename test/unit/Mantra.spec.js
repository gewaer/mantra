import Mantra, { isTruthy, isObject, isEmptyObject, isValidSchema, isValidStore, isOptionsValid, componentsRegistration } from '../../Mantra';
import { createLocalVue, shallowMount } from '@vue/test-utils';

describe('Mantra.js module', () => {
	it('should export a function', () => {
		expect(Mantra).toBeInstanceOf(Function);
	});

	describe('isTruthy', () => {

		it('should be a function', () => {
			expect(isTruthy).toBeInstanceOf(Function);
		});

		it('should return `true` for truthy values', () => {
			expect(isTruthy('hola')).toBe(true);
			expect(isTruthy(3)).toBe(true);
			expect(isTruthy(true)).toBe(true);
			expect(isTruthy({})).toBe(true);
			expect(isTruthy([])).toBe(true);
			expect(isTruthy(new Function())).toBe(true);
		});

		it('should return `false` for falsy values', () => {
			expect(isTruthy('')).toBe(false);
			expect(isTruthy(false)).toBe(false);
			expect(isTruthy(0)).toBe(false);
			expect(isTruthy(null)).toBe(false);
			expect(isTruthy(undefined)).toBe(false);
		});
	});

	describe('isObject', () => {

		it('should be a function', () => {
			expect(isObject).toBeInstanceOf(Function);
		});

		it('should return `true` for object values', () => {
			expect(isObject({ pepe: 5, rodrigo: 6 })).toBe(true);
			expect(isObject(new Object(null))).toBe(true);
		});

		it('should return `false` for non-object values', () => {
			expect(isObject([])).toBe(false);
			expect(isObject(2)).toBe(false);
			expect(isObject('hola')).toBe(false);
			expect(isObject(true)).toBe(false);
			expect(isObject(new Function())).toBe(false);
			expect(isObject(new Map())).toBe(false);
			expect(isObject(new Set())).toBe(false);
			expect(isObject(new Promise(() => true))).toBe(false);
		});
	});

	describe('isEmptyObject', () => {

		it('should be a function', () => {
			expect(isEmptyObject).toBeInstanceOf(Function);
		});

		it('should return `true` for an object with no properties', () => {
			expect(isEmptyObject({})).toBe(true);
		});

		it('should return `false` for an object with properties', () => {
			expect(isEmptyObject({ pepe: 'hola' })).toBe(false);
		});
	});

	describe('isValidSchema', () => {
		it('should be a function', () => {
			expect(isValidSchema).toBeInstanceOf(Function);
		});

		it('should return `true` for object values', () => {
			expect(isValidSchema({})).toBe(true);
			expect(isValidSchema({ pepe: 'hola' })).toBe(true);
		});

		it('should return `false` for non-object values', () => {
			expect(isValidSchema(null)).toBe(false);
			expect(isValidSchema(undefined)).toBe(false);
			expect(isValidSchema(false)).toBe(false);
			expect(isValidSchema(55)).toBe(false);
			expect(isValidSchema('hola')).toBe(false);
			expect(isValidSchema([])).toBe(false);
			expect(isValidSchema(new Function())).toBe(false);
		});
	});

	describe('isValidStore', () => {
		it('should be a function', () => {
			expect(isValidStore).toBeInstanceOf(Function);
		});

		it('should return `true` for a non-empty lib property of an object', () => {
			const store = { lib: { pepe: true } };

			expect(isValidStore(store)).toBe(true);
		});

		it('shoud return `false` for an empty lib property of an object', () => {
			const store = { lib: {} };
			expect(isValidStore(store)).toBe(false);
		});

		it('should return `false` for empty object values', () => {
			const store = {};
			expect(isValidStore(store)).toBe(false);
		});

		it('should return `false` for non-object values', () => {
			expect(isValidStore(null)).toBe(false);
			expect(isValidStore(undefined)).toBe(false);
			expect(isValidStore(false)).toBe(false);
			expect(isValidStore('hi')).toBe(false);
			expect(isValidStore(55)).toBe(false);
			expect(isValidStore([])).toBe(false);
			expect(isValidStore(new Function())).toBe(false);
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
		let localVue = null;
		beforeEach(() => (localVue = createLocalVue()));

		describe('componentsRegistration', () => {
			it('should be a function', () => {
				expect(componentsRegistration).toBeInstanceOf(Function);
			});

			it('should register components in the vue instance', () => {
				const components = {
					'test': {
						template: ''
					},
					'dummy': {
						template: ''
					}
				};

				componentsRegistration(localVue, components);
				
				const wrapper = shallowMount({
					template: '<div><test/><dummy/></div>'
				}, { localVue });

				expect(wrapper.find({ name: 'test' }).exists()).toBe(true);
				expect(wrapper.find({ name: 'dummy' }).exists()).toBe(true);
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

		describe('registerStoreModule', () => {

		});

		describe('install', () => {

		});

	});
});