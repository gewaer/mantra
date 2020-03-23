const isTest = String(process.env.NODE_ENV) === 'test';

module.exports = {
  presets: [
    ['@babel/preset-env', {modules: isTest ? 'commonjs' : false}],
  ],
  plugins: [
		'@babel/plugin-transform-runtime', 
		'@babel/plugin-proposal-object-rest-spread',
	],
}