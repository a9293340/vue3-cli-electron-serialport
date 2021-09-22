const { IgnorePlugin } = require('webpack');

module.exports = {
	pluginOptions: {
		plugins: [
			new IgnorePlugin({
				resourceRegExp: /serialport/,
			}),
		],
		electronBuilder: {
			preload: 'src/preload.js',
			nodeIntegration: true,
			externals: ['serialport'],
			// preload: { preload: 'src/preload.js', preload2: 'src/preload2.js' }
		},
	},
};
