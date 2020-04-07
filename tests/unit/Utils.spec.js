import 'jest-extended';
import { error, isTruthy, isObject, isEmptyObject } from '../../lib/utils';

describe('Utilities (Mantra)', () => {
  describe('error', () => {
    it('should be a function', () => {
      expect(error).toBeFunction();
    });

    it('should return a message with `[mantra]: ` prefixed', () => {
      const spyConsoleError = jest.spyOn(console, 'error').mockImplementation((msg) => msg);
      const errorMsg = 'Testing error message';
      error(errorMsg);
      expect(spyConsoleError).toHaveBeenCalled();
      expect(spyConsoleError).toHaveBeenLastCalledWith(`[mantra]: ${errorMsg}`);
    });
  });

  describe('isTruthy', () => {

    it('should be a function', () => {
      expect(isTruthy).toBeFunction();
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
      expect(isObject).toBeFunction();
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
      expect(isEmptyObject).toBeFunction();
    });

    it('should return `true` for an object with no properties', () => {
      expect(isEmptyObject({})).toBeTrue();
    });

    it('should return `false` for an object with properties', () => {
      expect(isEmptyObject({ pepe: 'hola' })).toBeFalse();
    });
  });
});