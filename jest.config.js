const path = require('path');

module.exports = {
	rootDir: path.join(__dirname, './test'),
	displayName: 'client',
	testEnvironment: 'jest-environment-node',
	moduleDirectories: ['node_modules'],
	testMatch: ['**/test/unit/**/*.js'],
	collectCoverageFrom: ['**/lib/**/*.js'],
	watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname']
};