import PATHS from '../settings/paths.js'
import HELPERS from '../settings/helpers.js'
import PLUGINS from '../settings/plugins.js'

import CSSLoaderConfig from '../configs/CSSLoader.config.js'
import outputConfig from '../configs/output.config.js'
import PROJECT_CONFIG from '../configs/project.config.js'
import replaceLoaderConfig from '../configs/replaceLoader.config.js'
import resolveConfig from '../configs/resolve.config.js'

import serverConfig from './webpack.server.js'

const {
	entry,
	server: { port, publicFolder, sourceMapType, stats, watchFiles }
} = PROJECT_CONFIG
const {
	ASSETS_FOLDER,
	IMAGES_FOLDER,
	PAGES_FOLDER,
	SCRIPTS_FOLDER,
	SRC_FOLDER,
	src: {
		favicon: faviconSrc,
		images: imagesSrc,
		js: jsSrc,
		json: jsonSrc,
		pug: pugSrc,
		markdown: markdownSrc
	}
} = PATHS
const {
	pugPages,
	REGEXPS: {
		HTML_EXTENSION,
		JS_EXTENSION_REGEX,
		NODE_MODULES_REGEX,
		PUG_EXTENSION_REGEX,
		SCSS_EXTENSION_REGEX
	}
} = HELPERS
const { CopyPlugin, HtmlWebpackPlugin, join } = PLUGINS

export default {
	mode: 'development',
	devtool: sourceMapType ?? 'inline-source-map',
	stats: stats ?? 'errors-warnings',
	optimization: {
		minimize: false
	},
	entry: jsSrc,
	output: outputConfig(
		join(ASSETS_FOLDER, SCRIPTS_FOLDER, `${entry ?? 'main'}.min.js`)
	),
	devServer: serverConfig({
		port,
		publicFolder,
		watchFiles: [imagesSrc, jsonSrc, markdownSrc, pugSrc, ...watchFiles ?? []]
	}),
	plugins: [
		...pugPages.map((pugPage) => {
			return new HtmlWebpackPlugin({
				filename: pugPage.replace(PUG_EXTENSION_REGEX, HTML_EXTENSION),
				inject: false,
				minify: false,
				production: false,
				template: join(SRC_FOLDER, PAGES_FOLDER, pugPage)
			})
		}),
		new CopyPlugin({
			patterns: [
				{
					from: join(SRC_FOLDER, IMAGES_FOLDER),
					to: join(ASSETS_FOLDER, IMAGES_FOLDER),
					noErrorOnMissing: true
				},
				{
					from: faviconSrc,
					to: './',
					noErrorOnMissing: true
				}
			]
		})
	],
	module: {
		rules: [
			{
				test: JS_EXTENSION_REGEX,
				exclude: NODE_MODULES_REGEX,
				resolve: {
					fullySpecified: false
				}
			},
			{
				test: SCSS_EXTENSION_REGEX,
				use: [
					'style-loader',
					{
						loader: 'string-replace-loader',
						options: replaceLoaderConfig({
							startPath: '../'
						})
					},
					{
						loader: 'css-loader',
						options: CSSLoaderConfig({
							endPath: '/',
							importLoaders: 1,
							isSourceMap: true
						})
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}
				]
			},
			{
				test: PUG_EXTENSION_REGEX,
				use: [
					{
						loader: 'string-replace-loader',
						options: replaceLoaderConfig({
							startPath: `${ASSETS_FOLDER}/`
						})
					},
					{
						loader: 'pug-loader',
						options: {
							self: true
						}
					}
				]
			}
		]
	},
	resolve: resolveConfig
}
