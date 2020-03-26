const path = require('path');
const {defaults} = require('jest-config');

module.exports = {
	rootDir: path.join(__dirname, './test'),
	displayName: 'client',
	testEnvironment: 'jest-environment-jsdom',
	moduleDirectories: ['node_modules'],
	moduleFileExtensions: [...defaults.moduleFileExtensions, 'vue'],
	testMatch: ['**/test/unit/**/*.js'],
	collectCoverageFrom: ['**/lib/**/*.js'],
	watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
	transform: {
		'^.+\\.[t|j]sx?$': 'babel-jest',
		'.*\\.(vue)$': 'vue-jest'
	}
};