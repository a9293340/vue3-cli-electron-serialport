const { IgnorePlugin } = require('webpack');
const webpack = require('webpack');
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
			builderOptions: {
				asar: true, // 是否使用 asar 壓縮檔案\
				artifactName: '${name}-v${version}.${ext}', // 檔案名稱樣板
				copyright: 'Copyright©cino', // 版權
				// Windows 相關設定
				win: {
					icon: 'public/favicon.ico', // 安裝檔圖示
					target: [
						{
							target: 'nsis', // 檔案類型
							arch: ['x64', 'ia32'], // 檔案位元，越多類型檔案越大
						},
					],
				},
				// DMG 相關設定
				dmg: {
					icon: 'public/icon.icns', // 安裝檔圖示
				},
				// Linux 相關設定
				linux: {
					icon: 'public/icon.png', // 安裝檔圖示
				},
				// macOS 相關設定
				mac: {
					icon: 'public/icon.icns', // 安裝檔圖示
				},
				nsis: {
					oneClick: false, // 是否一鍵安裝
					// perMachine: true, // 是否為每一台機器安裝
					installerIcon: 'public/favicon.ico', // 安裝圖示
					uninstallerIcon: 'public/favicon.ico', // 卸載圖示
					installerHeaderIcon: 'public/favicon.ico', // 安裝頂部圖示
					allowToChangeInstallationDirectory: true, // 是否可更改安裝目錄
					createDesktopShortcut: true, // 是否建立桌面捷徑
					createStartMenuShortcut: true, // 是否建立開始捷徑
				},
			},
		},
	},
	configureWebpack: {
		plugins: [
			new webpack.DefinePlugin({
				'process.env': {
					PACKAGE_JSON: '"' + require('./package.json').version + '"',
					COMPANY: '"' + require('./package.json').author + '"',
				},
			}),
		],
	},
};
