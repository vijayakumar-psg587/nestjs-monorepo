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
		path: path.join(process.cwd(), './dist/apps/graphql'),
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
	plugins: [
		new Dotenv({
			path: './apps/graphql/config/development/.env', // load this now instead of the ones in '.env'
			safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
			allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
			systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
			silent: true, // hide any errors
			defaults: false, // load '.env.defaults' as the default values if empty.
		}),
	],
};
