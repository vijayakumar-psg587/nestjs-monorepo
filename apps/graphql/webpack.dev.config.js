// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodeExternals = require('webpack-node-externals');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const terserPlugin = require('terser-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotEnvPlugin = require('dotenv-webpack');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
	entry: ['./apps/graphql/src/main.ts'],
	watch: false,
	mode: 'development',
	devtool: 'inline-source-map',
	resolve: {
		extensions: ['.ts', '.js', '.jade'],
	},
	optimization: {
		minimizer: [terserPlugin],
	},
	target: 'node',
	output: {
		path: path.join(process.cwd(), './dist/graphql'),
		filename: 'main.js',
	},
	externals: [nodeExternals()],
	module: {
		rules: [
			{
				test: /.tsx?$/,
				use: ['ts-loader'],
				exclude: /node_modules/,
			},
			{
				test: /\.handlebars$/,
				loader: 'handlebars-loader',
				options: {
					knownHelpersOnly: false,
					inlineRequires: /\/assets\/(:?images|audio|video)\//gi,
					partialDirs: [path.join(__dirname, './src/views/email/partials')],
				},
			},
		],
	},
	plugins: [],
};
