module.exports = {
	apps: [
		{
			name: 'node-graph-api',
			script: 'target/dist/graphql/main.js',
			instances: 2,
			mode: 'cluster',
			autorestart: true,
			watch: false,
			max_memory_restart: '2G',
			env: {
				NODE_ENV: 'dev',
			},
		},
	],

	deploy: {
		production: {
			user: 'SSH_USERNAME',
			host: 'SSH_HOSTMACHINE',
			ref: 'origin/master',
			repo: 'GIT_REPOSITORY',
			path: 'DESTINATION_PATH',
			'pre-deploy-local': '',
			'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
			'pre-setup': '',
		},
	},
};
