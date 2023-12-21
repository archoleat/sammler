import MiniCssExtractPlugin from 'mini-css-extract-plugin'

import PATHS from '../settings/paths.js'
import HELPERS from '../settings/helpers.js'
import PLUGINS from '../settings/plugins.js'

import CSSLoaderConfig from '../configs/CSSLoader.config.js'
import outputConfig from '../configs/output.config.js'
import PROJECT_CONFIG from '../configs/project.config.js'
import replaceLoaderConfig from '../configs/replaceLoader.config.js'
import resolveConfig from '../configs/resolve.config.js'

const {
	entry,
	isBabel,
	cache: { settings },
	formatters: {
		languages: { isPugPretty, sassOutputStyle }
	}
} = PROJECT_CONFIG
const {
	ASSETS_FOLDER,
	PAGES_FOLDER,
	SRC_FOLDER,
	babelConfigFile,
	src: {
		favicon: faviconSrc,
		htaccess: htaccessSrc,
		robots: robotsSrc
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
const { CopyPlugin, HtmlWebpackPlugin, join, TerserPlugin } = PLUGINS

export default {
	mode: 'production',
	cache: settings ?? {
		type: 'filesystem'
	},
	optimization: {
		minimizer: [
			new TerserPlugin({
				extractComments: false
			})
		]
	},
	output: outputConfig(`${entry ?? 'main'}.min.js`),
	plugins: [
		...pugPages.map((pugPage) => {
			return new HtmlWebpackPlugin({
				filename: join(
					'../..',
					pugPage.replace(PUG_EXTENSION_REGEX, HTML_EXTENSION)
				),
				inject: false,
				minify: false,
				production: true,
				template: join(SRC_FOLDER, PAGES_FOLDER, pugPage)
			})
		}),
		new MiniCssExtractPlugin({
			filename: '../css/style.css'
		}),
		new CopyPlugin({
			patterns: [
				{
					from: faviconSrc,
					to: '../../',
					noErrorOnMissing: true
				},
				{
					from: robotsSrc,
					to: '../../',
					noErrorOnMissing: true
				},
				{
					from: htaccessSrc,
					to: '../../',
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
				use: isBabel ? [
					{
						loader: 'babel-loader',
						options: {
							configFile: babelConfigFile
						}
					}
				] : undefined,
				resolve: {
					fullySpecified: false
				}
			},
			{
				test: SCSS_EXTENSION_REGEX,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'string-replace-loader',
						options: replaceLoaderConfig({
							startPath: '../'
						})
					},
					{
						loader: 'css-loader',
						options: CSSLoaderConfig()
					},
					{
						loader: 'sass-loader',
						options: {
							sassOptions: {
								outputStyle: sassOutputStyle ?? 'expanded'
							}
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
							pretty: isPugPretty ?? true,
							self: true
						}
					}
				]
			}
		]
	},
	resolve: resolveConfig
}
