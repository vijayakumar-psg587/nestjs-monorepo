export const COMMON_CONST = {
	MANDATORY_HEADERS_NAME_LIST: ['CS-LOG-TRACKING-ID', 'CS-USER-TYPE', 'CS-CONSUMER-APP-PROCESS', 'CS-PRINCIPAL-ROLE'],
	HEADERS: {
		CS_LOG_TRACKING_ID: 'CS-LOG-TRACKING-ID',
		CS_USER_ID: 'CS-USER-ID',
		CS_USER_TYPE: 'CS-USER-TYPE',
		CS_PRINCIPAL_ROLE: 'CS-PRINCIPAL-ROLE',
		CS_CONSUMER_APP_PROCESS: 'CS-CONSUMER-APP-PROCESS',
	},
	CHAR: {
		COMMA: ',',
		SLASH: '/',
		COLON: ':',
		SEMI_COLON: ';',
		HYPHEN: '-',
		AT: '@',
		UNDERSCORE: '_',
		QUESTION: '?',
		DOT: '.',
	},
	COMMON: {
		CONTEXT: {
			GRAPH_QL: 'graph-api',
			REDIS: 'redis',
			ES: 'es',
		},
		APP_NAME: {
			GRAPH_QL: 'graph_app',
			REDIS: 'redis-app',
			ES: 'es-app',
		},
		REDACT_DEFAULT: ['headers["Content-type"]', 'req["headers"]["Authorization"]'],
		DEFAULT_DATE_TIME_FORMAT: 'yyyy-MM-dd HH:mm:ss.SSSS',
	},
	CORS: {
		HEADERS: ['Access-Control-Allow-Origin', 'Access-Control-Allow-Methods', 'Access-Control-Allow-Headers', 'Access-Control-Max-Age', 'Access-Control-Allow-Credentials'],
		WHITELIST: ['127.0.0.0', '127.0.0.0:3002', 'localhost:3002', '0.0.0.0:3002', '*', 'localhost', '*'],
		ALLOW_HEADERS: ['Content-type', 'Authorization', 'Origin', 'X-Forwaded-for', 'Referrer', 'Origin'],
		ALLOW_METHODS: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
		ALLOW_CRED: true,
	},
	HEALTH_CHECK: {
		URL: 'https://jsonplaceholder.typicode.com/posts/1',
		METHOD: 'GET',
		PROXY: 'http://http.proxy.fmr.com:8000',
	},
	MIMETYPE: {
		APPLICATION_JSON: 'application/json',
		MULTIPART_FORM_DATA: 'multipart/form-data',
	},
	REGEX: {
		MULTIPART_CONTENT_TYPE: /^(multipart)[\/\\\-\w]*$/,
		FILE_NAME: /^[\w]{2,}(.(csv|xls|xlsx|env|mp4))$/,
		NUMBER: /^[\d]$/,
	},
};
