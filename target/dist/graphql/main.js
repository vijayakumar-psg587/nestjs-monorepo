/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(3);
const app_controller_1 = __webpack_require__(4);
const app_service_1 = __webpack_require__(5);
const common_module_1 = __webpack_require__(19);
const api_module_1 = __webpack_require__(35);
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [common_module_1.CommonModule, api_module_1.ApiModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const common_1 = __webpack_require__(3);
const app_service_1 = __webpack_require__(5);
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        const msg = this.appService.getHello({ name: 'vv' });
        return { message: msg };
    }
};
__decorate([
    (0, common_1.Get)('/test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getHello", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);
exports.AppController = AppController;


/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const common_1 = __webpack_require__(3);
const log_decorator_1 = __webpack_require__(6);
let AppService = class AppService {
    getHello(s) {
        return 'Hello World!';
    }
};
__decorate([
    (0, log_decorator_1.logDecorator)('AppService'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof Record !== "undefined" && Record) === "function" ? _a : Object]),
    __metadata("design:returntype", String)
], AppService.prototype, "getHello", null);
AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.logDecorator = void 0;
const perf_hooks_1 = __webpack_require__(7);
const common_1 = __webpack_require__(8);
const common_constants_1 = __webpack_require__(15);
const logDecorator = (className) => (target, propertyKey, descriptor) => {
    const originalMethod = descriptor.value;
    const infoLog = common_1.PinoLoggerService.getLoggerConfig('info', common_constants_1.COMMON_CONST.COMMON.APP_NAME.GRAPH_QL);
    const errorLog = common_1.PinoLoggerService.getLoggerConfig('error', common_constants_1.COMMON_CONST.COMMON.APP_NAME.GRAPH_QL);
    const methodName = propertyKey;
    let argsPassed;
    let result;
    descriptor.value = async function (...args) {
        const proxy = new Proxy(originalMethod, {
            apply: function (target, thisArgs, arg) {
                argsPassed = JSON.stringify(arg);
                return target(...arg);
            },
        });
        const start = perf_hooks_1.performance.now();
        infoLog.info(`Class: ${className} - Method- ${methodName} - Started execution with args: ${argsPassed}`);
        result = await proxy.apply(this, args).catch((err) => {
            const finish = perf_hooks_1.performance.now();
            errorLog.error(`Class: ${className} - Method- ${methodName} - Error executing with args: ${argsPassed} \n
				Exec Time: ${finish - start} milliseconds: \n
				Error: ${err}`);
            throw err;
        });
        const finish = perf_hooks_1.performance.now();
        infoLog.info(`Class: ${className} - Method- ${methodName} - Execution time: ${finish - start} milliseconds - with args: ${argsPassed}`);
        return result;
    };
};
exports.logDecorator = logDecorator;


/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("perf_hooks");

/***/ }),
/* 8 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(9), exports);
__exportStar(__webpack_require__(10), exports);
__exportStar(__webpack_require__(17), exports);


/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonModule = void 0;
const common_1 = __webpack_require__(3);
const pino_logger_service_1 = __webpack_require__(10);
const axios_config_service_1 = __webpack_require__(17);
const app_util_service_1 = __webpack_require__(12);
const retry_service_1 = __webpack_require__(18);
let CommonModule = class CommonModule {
};
CommonModule = __decorate([
    (0, common_1.Module)({
        providers: [pino_logger_service_1.PinoLoggerService, axios_config_service_1.AxiosConfigService, app_util_service_1.AppUtilService, retry_service_1.RetryService],
        exports: [pino_logger_service_1.PinoLoggerService, axios_config_service_1.AxiosConfigService, app_util_service_1.AppUtilService],
    })
], CommonModule);
exports.CommonModule = CommonModule;


/***/ }),
/* 10 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PinoLoggerService_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PinoLoggerService = void 0;
const common_1 = __webpack_require__(3);
const os = __webpack_require__(11);
const app_util_service_1 = __webpack_require__(12);
const pino = __webpack_require__(16);
const common_constants_1 = __webpack_require__(15);
let PinoLoggerService = PinoLoggerService_1 = class PinoLoggerService {
    static getLoggerConfig(level, appName, redactKeys) {
        return pino({
            useLevelLabels: true,
            prettyPrint: (() => {
                return process.env.NODE_ENV && process.env.NODE_ENV === 'dev';
            })(),
            messageKey: appName + '-message',
            level: level,
            redact: {
                paths: (() => redactKeys !== null && redactKeys !== void 0 ? redactKeys : common_constants_1.COMMON_CONST.COMMON.REDACT_DEFAULT)(),
                censor: '****',
            },
            base: {
                hostName: os.hostname(),
                platform: os.platform(),
                processId: process.pid,
                timestamp: app_util_service_1.AppUtilService.getAppLevelDefaultUTCTime(),
            },
        });
    }
    error(message, ...optionalParams) {
        PinoLoggerService_1.getLoggerConfig(optionalParams['level'], optionalParams['appName']).error(message);
    }
    log(message, ...optionalParams) {
        PinoLoggerService_1.getLoggerConfig(optionalParams['level'], optionalParams['appName']).info(message);
    }
    warn(message, ...optionalParams) {
        PinoLoggerService_1.getLoggerConfig(optionalParams['level'], optionalParams['appName']).warn(message);
    }
    debug(message, ...optionalParams) {
        PinoLoggerService_1.getLoggerConfig(optionalParams['level'], optionalParams['appName']).debug(message);
    }
};
PinoLoggerService = PinoLoggerService_1 = __decorate([
    (0, common_1.Injectable)()
], PinoLoggerService);
exports.PinoLoggerService = PinoLoggerService;


/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = require("os");

/***/ }),
/* 12 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppUtilService = void 0;
const common_1 = __webpack_require__(3);
const dateFns = __webpack_require__(13);
const locale = __webpack_require__(14);
const common_constants_1 = __webpack_require__(15);
let AppUtilService = class AppUtilService {
    static getAppLevelDefaultUTCTime() {
        return dateFns.format(Date.now(), common_constants_1.COMMON_CONST.COMMON.DEFAULT_DATE_TIME_FORMAT, { locale: locale.enIN });
    }
};
AppUtilService = __decorate([
    (0, common_1.Injectable)({
        scope: common_1.Scope.DEFAULT,
    })
], AppUtilService);
exports.AppUtilService = AppUtilService;


/***/ }),
/* 13 */
/***/ ((module) => {

module.exports = require("date-fns");

/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("date-fns/locale");

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.COMMON_CONST = void 0;
exports.COMMON_CONST = {
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


/***/ }),
/* 16 */
/***/ ((module) => {

module.exports = require("pino");

/***/ }),
/* 17 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AxiosConfigService = void 0;
const common_1 = __webpack_require__(3);
const common_constants_1 = __webpack_require__(15);
let AxiosConfigService = class AxiosConfigService {
    static setAxiosRequestHeaders(trackingId, userID, principalRole) {
        return {
            'CS-APP-NAME': common_constants_1.COMMON_CONST.COMMON.APP_NAME,
            'CS-LOG-TRACKING-ID': trackingId,
            'CS-USER-TYPE': userID,
            'CS-CONSUMER-APP-PROCESS': 'PM' + trackingId,
            'CS-PRINCIPAL-ROLE': principalRole,
        };
    }
};
AxiosConfigService = __decorate([
    (0, common_1.Injectable)()
], AxiosConfigService);
exports.AxiosConfigService = AxiosConfigService;


/***/ }),
/* 18 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RetryService = void 0;
const common_1 = __webpack_require__(3);
let RetryService = class RetryService {
};
RetryService = __decorate([
    (0, common_1.Injectable)()
], RetryService);
exports.RetryService = RetryService;


/***/ }),
/* 19 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonModule = void 0;
const common_1 = __webpack_require__(3);
const custom_exception_filter_1 = __webpack_require__(20);
const header_interceptor_1 = __webpack_require__(23);
const app_config_service_1 = __webpack_require__(28);
const exception_validator_service_1 = __webpack_require__(31);
const cors_interceptor_1 = __webpack_require__(33);
let CommonModule = class CommonModule {
};
CommonModule = __decorate([
    (0, common_1.Module)({
        providers: [app_config_service_1.AppConfigService, header_interceptor_1.HeaderInterceptor, custom_exception_filter_1.CustomExceptionFilter, exception_validator_service_1.ExceptionValidatorService, cors_interceptor_1.CorsInterceptor],
    })
], CommonModule);
exports.CommonModule = CommonModule;


/***/ }),
/* 20 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomExceptionFilter = void 0;
const common_1 = __webpack_require__(3);
const custom_error_model_1 = __webpack_require__(21);
let CustomExceptionFilter = class CustomExceptionFilter {
    catch(exception, host) {
        console.log('ece:', exception, typeof exception, exception instanceof custom_error_model_1.CustomErrorModel);
        const resp = host.switchToHttp().getResponse();
        if (exception instanceof common_1.HttpException) {
            const hte = exception;
            resp.code(hte.getStatus()).status(hte.getStatus()).send({ message: hte.message });
        }
        else if (exception instanceof custom_error_model_1.CustomErrorModel) {
            const ce = exception;
            resp.code(+ce.code)
                .status(ce.status)
                .send({ message: ce.message, time: ce.timestamp });
        }
        else {
            const e = exception;
            resp.code(500).status(500).send({ message: e.message });
        }
    }
};
CustomExceptionFilter = __decorate([
    (0, common_1.Injectable)({
        scope: common_1.Scope.DEFAULT,
    }),
    (0, common_1.Catch)()
], CustomExceptionFilter);
exports.CustomExceptionFilter = CustomExceptionFilter;


/***/ }),
/* 21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomErrorModel = void 0;
const class_transformer_1 = __webpack_require__(22);
const app_util_service_1 = __webpack_require__(12);
class CustomErrorModel {
    constructor(code, title, message, status) {
        this.code = code;
        this.title = title;
        this.message = message;
        this.status = status;
        this.timestamp = app_util_service_1.AppUtilService.getAppLevelDefaultUTCTime();
    }
}
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CustomErrorModel.prototype, "code", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CustomErrorModel.prototype, "title", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], CustomErrorModel.prototype, "message", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], CustomErrorModel.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CustomErrorModel.prototype, "timestamp", void 0);
exports.CustomErrorModel = CustomErrorModel;


/***/ }),
/* 22 */
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),
/* 23 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HeaderInterceptor = void 0;
const common_1 = __webpack_require__(3);
const principal_role_type_enum_1 = __webpack_require__(24);
const user_type_enum_1 = __webpack_require__(25);
const custom_error_model_1 = __webpack_require__(21);
const app_constants_1 = __webpack_require__(26);
const app_util_service_1 = __webpack_require__(12);
const graphql_1 = __webpack_require__(27);
let HeaderInterceptor = class HeaderInterceptor {
    intercept(context, next) {
        const gContext = graphql_1.GqlExecutionContext.create(context);
        const req = gContext.getContext().req;
        const headerGen = this.headerGenerator(req.headers);
        let genVal = null;
        let headerErrList = [];
        let itrFlag = true;
        while (itrFlag || (genVal && !genVal.done)) {
            genVal = headerGen.next();
            if (genVal.done) {
                itrFlag = false;
            }
            if (genVal && genVal.value && genVal.value.key === app_constants_1.APP_CONST.HEADERS.CI_USER_TYPE.toLowerCase()) {
                headerErrList =
                    Object.keys(user_type_enum_1.UserIdType).filter((item) => item.toLowerCase() === genVal.value.key).length > 1
                        ? (() => {
                            const errMsg = `Request does not contain a valid UserIdType`;
                            headerErrList.push(errMsg);
                            return [...headerErrList];
                        })()
                        : headerErrList;
            }
            if (genVal && genVal.value && genVal.value.key === app_constants_1.APP_CONST.HEADERS.CI_PRINCIPAL_ROLE.toLowerCase()) {
                headerErrList =
                    Object.keys(principal_role_type_enum_1.PrincipalRoleType).filter((item) => item.toLowerCase() === genVal.value.key).length > 1
                        ? (() => {
                            const errMsg = `Request does not contain a valid PrincipalRole`;
                            headerErrList.push(errMsg);
                            return [...headerErrList];
                        })()
                        : headerErrList;
            }
        }
        if (headerErrList.length >= 1) {
            const errModel = new custom_error_model_1.CustomErrorModel();
            errModel.code = '451';
            errModel.status = common_1.HttpStatus.BAD_REQUEST;
            errModel.timestamp = app_util_service_1.AppUtilService.getAppLevelDefaultUTCTime();
            headerErrList.forEach((item) => {
                if (errModel.message) {
                    errModel.message = errModel.message + ' : ' + item;
                }
                else {
                    errModel.message = item;
                }
            });
            throw errModel;
        }
        else {
            return next.handle();
        }
    }
    *headerGenerator(headerObj) {
        for (const key of Object.keys(headerObj)) {
            if (key.toLowerCase() === app_constants_1.APP_CONST.HEADERS.CI_USER_TYPE.toLowerCase() || key.toLowerCase() === app_constants_1.APP_CONST.HEADERS.CI_PRINCIPAL_ROLE.toLowerCase())
                yield {
                    key: key.toLowerCase(),
                    value: headerObj[key].toLowerCase(),
                };
        }
    }
};
HeaderInterceptor = __decorate([
    (0, common_1.Injectable)({
        scope: common_1.Scope.DEFAULT,
    })
], HeaderInterceptor);
exports.HeaderInterceptor = HeaderInterceptor;


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrincipalRoleType = void 0;
var PrincipalRoleType;
(function (PrincipalRoleType) {
    PrincipalRoleType["CLIENT"] = "CLIENT";
    PrincipalRoleType["BO"] = "BO";
    PrincipalRoleType["SYSTEM"] = "SYSTEM";
})(PrincipalRoleType = exports.PrincipalRoleType || (exports.PrincipalRoleType = {}));


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserIdType = void 0;
var UserIdType;
(function (UserIdType) {
    UserIdType["CLIENT_AGENT"] = "CLIENT_AGENT";
    UserIdType["FID_ASSOCIATE"] = "CI_ASSOCIATE";
    UserIdType["FID_EMP"] = "CI_EMP";
})(UserIdType = exports.UserIdType || (exports.UserIdType = {}));


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.APP_CONST = void 0;
exports.APP_CONST = {
    MANDATORY_HEADERS_NAME_LIST: ['CI-LOG-TRACKING-ID', 'CI-USER-TYPE', 'CI-CONSUMER-APP-PROCESS', 'CI-PRINCIPAL-ROLE'],
    HEADERS: {
        CI_LOG_TRACKING_ID: 'CI-LOG-TRACKING-ID',
        CI_USER_ID: 'CI-USER-ID',
        CI_USER_TYPE: 'CI-USER-TYPE',
        CI_PRINCIPAL_ROLE: 'CI-PRINCIPAL-ROLE',
        CI_CONSUMER_APP_PROCESS: 'CI-CONSUMER-APP-PROCESS',
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
        REDACT: ['headers["Content-type"]', 'req["headers"]["Authorization"]'],
        APP_NAME: 'fastify-graphql',
        DEFAULT_APP_PORT: 3002,
        DEFAULT_APP_HOST: '0.0.0.0',
        APP_CONTEXT: '/graph-api',
        DEFAULT_DATE_TIME_FORMAT: 'yyyy-MM-dd HH:mm:ss.SSSS',
    },
    CORS: {
        HEADERS: ['Access-Control-Allow-Origin', 'Access-Control-Allow-Methods', 'Access-Control-Allow-Headers', 'Access-Control-Max-Age', 'Access-Control-Allow-Credentials'],
        WHITELIST: ['127.0.0.0', '127.0.0.0:3002', 'localhost:3002', '0.0.0.0:3002', '*'],
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


/***/ }),
/* 27 */
/***/ ((module) => {

module.exports = require("@nestjs/graphql");

/***/ }),
/* 28 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppConfigService = void 0;
const common_1 = __webpack_require__(3);
const app_config_model_1 = __webpack_require__(29);
const app_constants_1 = __webpack_require__(26);
const common_constants_1 = __webpack_require__(15);
const app_mongo_config_model_1 = __webpack_require__(30);
let AppConfigService = class AppConfigService {
    static getAppConfig() {
        if (!this.appConfigModel) {
            this.appConfigModel = new app_config_model_1.AppConfigModel();
            this.appConfigModel.contextPath = common_constants_1.COMMON_CONST.COMMON.CONTEXT.GRAPH_QL;
            this.appConfigModel.retries = +process.env.HTTP_RETRIES;
            this.appConfigModel.port = process.env.APP_PORT ? process.env.APP_PORT : app_constants_1.APP_CONST.COMMON.DEFAULT_APP_PORT;
            this.appConfigModel.host = process.env.APP_HOST ? process.env.APP_HOST : app_constants_1.APP_CONST.COMMON.DEFAULT_APP_HOST;
            this.appConfigModel.appVersion = process.env.APP_VERSION;
            this.appConfigModel.timeout = +process.env.HTTP_TIMEOUT;
            this.appConfigModel.maxRedirects = +process.env.HTTP_MAX_REDIRECTS;
            this.appConfigModel.maxSockets = +process.env.HTTP_MAX_SOCKETS;
        }
        return this.appConfigModel;
    }
    static getAppMongoConfig() {
        var _a;
        if (!this.appMongoConfigModel) {
            this.appMongoConfigModel = new app_mongo_config_model_1.AppMongoConfigModel();
            this.appMongoConfigModel.database = process.env.MONGO_DB_DATABASE;
            this.appMongoConfigModel.cluster = process.env.MONGO_DB_CLUSTER;
            this.appMongoConfigModel.clusterOptions = process.env.MONGO_DB_CLUSTER_OPTIONS;
            this.appMongoConfigModel.protocol = process.env.MONGO_DB_PROTOCOL;
            this.appMongoConfigModel.userName = process.env.MONGO_DB_USERNAME;
            this.appMongoConfigModel.password = process.env.MONGO_DB_PASSWORD;
            this.appMongoConfigModel.connectionTm = (_a = +process.env.MONGO_DB_CONNECTION_TM) !== null && _a !== void 0 ? _a : 7000;
            this.appMongoConfigModel.keepAlive = process.env.MONGO_DB_KEEPALIVE ? process.env.MONGO_DB_KEEPALIVE === 'true' : false;
        }
        return this.appMongoConfigModel;
    }
};
AppConfigService = __decorate([
    (0, common_1.Injectable)({
        scope: common_1.Scope.DEFAULT,
    })
], AppConfigService);
exports.AppConfigService = AppConfigService;


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppConfigModel = void 0;
class AppConfigModel {
}
exports.AppConfigModel = AppConfigModel;


/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppMongoConfigModel = void 0;
class AppMongoConfigModel {
}
exports.AppMongoConfigModel = AppMongoConfigModel;


/***/ }),
/* 31 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ExceptionValidatorService_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExceptionValidatorService = void 0;
const common_1 = __webpack_require__(3);
const custom_error_model_1 = __webpack_require__(21);
const error_type_enum_1 = __webpack_require__(32);
const app_constants_1 = __webpack_require__(26);
const os_1 = __webpack_require__(11);
let ExceptionValidatorService = ExceptionValidatorService_1 = class ExceptionValidatorService {
    static handleCustomException(errorCode, type, customMsg) {
        const customErr = new custom_error_model_1.CustomErrorModel();
        if (type === error_type_enum_1.ErrorTypes.VALIDATION) {
            customErr.code = error_type_enum_1.ErrorTypes.VALIDATION;
            customErr.status = 421;
        }
        else if (type === error_type_enum_1.ErrorTypes.REQ) {
            customErr.code = error_type_enum_1.ErrorTypes.REQ;
            customErr.status = 424;
        }
        else if (type === error_type_enum_1.ErrorTypes.DB) {
            customErr.code = error_type_enum_1.ErrorTypes.DB;
            customErr.status = 425;
        }
        else {
            customErr.code = type;
            customErr.status = 500;
        }
        customErr.message = customMsg;
        customErr.timestamp = 'test';
        return customErr;
    }
    static customValidationExceptionFactory(errors) {
        const customError = new custom_error_model_1.CustomErrorModel();
        customError.code = '400';
        customError.timestamp = 'test';
        customError.status = common_1.HttpStatus.BAD_REQUEST;
        let errMessage = '';
        errors.forEach((err) => {
            errMessage = errMessage === '' ? ExceptionValidatorService_1.getValidationErrorMessage(err) : errMessage.concat(app_constants_1.APP_CONST.CHAR.HYPHEN).concat(ExceptionValidatorService_1.getValidationErrorMessage(err));
        });
        console.log('final Error message:', errMessage);
        customError.message = errMessage;
        throw customError;
    }
    static getValidationErrorMessage(err) {
        let targetName = '';
        if (err && err.target) {
            if (err.target.constructor) {
                targetName = err.target.constructor.name;
            }
            else {
                targetName = err.target.name;
            }
        }
        return (`Validation err for - ${targetName} with property - ${err.property} -value - ${err.value}
      has the constraints - ${JSON.stringify(err.constraints)}` + os_1.default.EOL);
    }
};
ExceptionValidatorService = ExceptionValidatorService_1 = __decorate([
    (0, common_1.Injectable)()
], ExceptionValidatorService);
exports.ExceptionValidatorService = ExceptionValidatorService;


/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ErrorTypes = void 0;
var ErrorTypes;
(function (ErrorTypes) {
    ErrorTypes["REQ"] = "request";
    ErrorTypes["VALIDATION"] = "validation";
    ErrorTypes["AWS"] = "AWS";
    ErrorTypes["DB"] = "database";
    ErrorTypes["CUSTOM"] = "{name:'custom', type: 12 }";
})(ErrorTypes = exports.ErrorTypes || (exports.ErrorTypes = {}));


/***/ }),
/* 33 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CorsInterceptor = void 0;
const app_constants_1 = __webpack_require__(26);
const common_1 = __webpack_require__(3);
const rxjs_1 = __webpack_require__(34);
const graphql_1 = __webpack_require__(27);
const custom_error_model_1 = __webpack_require__(21);
let CorsInterceptor = class CorsInterceptor {
    intercept(context, next) {
        const gContext = graphql_1.GqlExecutionContext.create(context);
        const request = gContext.switchToHttp().getRequest();
        const res = gContext.switchToHttp().getResponse();
        console.log('coming in cors');
        const hostHeader = request.headers['host'];
        const originHeader = request.headers['origin'] && true ? request.headers['origin'] : null;
        console.log('origin header', originHeader);
        let allowedHostOrOrigin = null;
        if (hostHeader) {
            allowedHostOrOrigin = app_constants_1.APP_CONST.CORS.WHITELIST.filter((item) => item.includes(hostHeader));
        }
        else if (originHeader) {
            allowedHostOrOrigin = app_constants_1.APP_CONST.CORS.WHITELIST.filter((item) => item.includes(originHeader));
        }
        if (allowedHostOrOrigin) {
            const corsMap = new Map();
            app_constants_1.APP_CONST.CORS.HEADERS.map((item) => {
                item = item.toLowerCase();
                if (item.includes('Origin'.toLowerCase())) {
                    corsMap.set(item, request.headers['host'] ? request.headers['host'] : request.headers['origin']);
                }
                else if (item.includes('Credentials'.toLowerCase())) {
                    corsMap.set(item, app_constants_1.APP_CONST.CORS.ALLOW_CRED);
                }
                else if (item.includes('Method'.toLowerCase())) {
                    corsMap.set(item, [...app_constants_1.APP_CONST.CORS.ALLOW_METHODS].join(','));
                }
                else if (item.includes('Headers'.toLowerCase())) {
                    corsMap.set(item, [...app_constants_1.APP_CONST.CORS.ALLOW_HEADERS].join(','));
                }
            });
            console.log('cors headers:', Object.fromEntries(corsMap));
            res.headers(Object.fromEntries(corsMap));
            return next.handle();
        }
        else {
            return next.handle().pipe((0, rxjs_1.switchMap)(() => {
                throw new custom_error_model_1.CustomErrorModel('500', 'CORS', `Cors does not accept origin/host of ${originHeader}/${hostHeader}`, 500);
            }));
        }
    }
};
CorsInterceptor = __decorate([
    (0, common_1.Injectable)()
], CorsInterceptor);
exports.CorsInterceptor = CorsInterceptor;


/***/ }),
/* 34 */
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),
/* 35 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiModule = void 0;
const common_1 = __webpack_require__(3);
const graphql_1 = __webpack_require__(27);
const movie_service_1 = __webpack_require__(36);
const path = __webpack_require__(41);
const movies_resolver_1 = __webpack_require__(42);
let ApiModule = class ApiModule {
};
ApiModule = __decorate([
    (0, common_1.Module)({
        imports: [
            graphql_1.GraphQLModule.forRoot({
                disableHealthCheck: true,
                autoSchemaFile: path.join(process.cwd(), 'apps/graphql/src/schema/schema.gql'),
            }),
        ],
        providers: [movie_service_1.MovieService, movies_resolver_1.MoviesResolver],
    })
], ApiModule);
exports.ApiModule = ApiModule;


/***/ }),
/* 36 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MovieService = void 0;
const common_1 = __webpack_require__(3);
const movies_query_1 = __webpack_require__(37);
const movie_db_model_1 = __webpack_require__(38);
let MovieService = class MovieService {
    constructor() { }
    async findAll() {
        const val = await movie_db_model_1.MovieDbModel.find().catch((err) => console.log(err));
        console.log('val:', val);
        const movie = new movies_query_1.Movies();
        movie.id = 1;
        movie.name = 'sample';
        movie.createdDate = 'test Date';
        return [movie];
    }
};
MovieService = __decorate([
    (0, common_1.Injectable)({
        scope: common_1.Scope.REQUEST,
    }),
    __metadata("design:paramtypes", [])
], MovieService);
exports.MovieService = MovieService;


/***/ }),
/* 37 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Movies = void 0;
const graphql_1 = __webpack_require__(27);
let Movies = class Movies {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Movies.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Movies.prototype, "createdDate", void 0);
__decorate([
    (0, graphql_1.Field)((type) => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Movies.prototype, "id", void 0);
Movies = __decorate([
    (0, graphql_1.ObjectType)()
], Movies);
exports.Movies = Movies;


/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MovieDbModel = void 0;
const mongoose = __webpack_require__(39);
const movie_db_schema_1 = __webpack_require__(40);
exports.MovieDbModel = mongoose.model('movies', movie_db_schema_1.movieDbSchema);


/***/ }),
/* 39 */
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.movieDbSchema = void 0;
const mongoose = __webpack_require__(39);
exports.movieDbSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, cast: String },
    id: { type: Number, required: true },
    name: { type: String, required: true },
    status: { type: String, required: false },
    type: { type: String, required: false },
    rating: { average: { type: Number, required: true } },
    genres: { type: [String], required: true },
});


/***/ }),
/* 41 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 42 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MoviesResolver = void 0;
const graphql_1 = __webpack_require__(27);
const movies_query_1 = __webpack_require__(37);
const movie_service_1 = __webpack_require__(36);
let MoviesResolver = class MoviesResolver {
    constructor(movieService) {
        this.movieService = movieService;
    }
    async getMovies(context) {
        console.log('getting gql context:', context);
        return await this.movieService.findAll();
    }
};
__decorate([
    (0, graphql_1.Query)((returns) => [movies_query_1.Movies], { name: 'movies' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof graphql_1.GqlExecutionContext !== "undefined" && graphql_1.GqlExecutionContext) === "function" ? _a : Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], MoviesResolver.prototype, "getMovies", null);
MoviesResolver = __decorate([
    (0, graphql_1.Resolver)((of) => movies_query_1.Movies),
    __metadata("design:paramtypes", [typeof (_c = typeof movie_service_1.MovieService !== "undefined" && movie_service_1.MovieService) === "function" ? _c : Object])
], MoviesResolver);
exports.MoviesResolver = MoviesResolver;


/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServerAdapterService = void 0;
const uuid_1 = __webpack_require__(44);
const app_config_service_1 = __webpack_require__(28);
const platform_fastify_1 = __webpack_require__(45);
const database_1 = __webpack_require__(46);
const app_constants_1 = __webpack_require__(26);
const custom_error_model_1 = __webpack_require__(21);
class ServerAdapterService {
    constructor() { }
    static configureHook(app) {
        app.getHttpServer().get().addHook('preHandler', (req, rep, done) => {
            if (req.routerPath === '*' && req.routerMethod === 'OPTIONS') {
                return done();
            }
        });
    }
    static async configureSecurity(app) {
        await app.register(__webpack_require__(50));
    }
    static async configureDbConnection(app) {
        const dbConfig = app_config_service_1.AppConfigService.getAppMongoConfig();
        const connUrl = dbConfig.protocol + app_constants_1.APP_CONST.CHAR.COLON + '//' + dbConfig.userName + app_constants_1.APP_CONST.CHAR.COLON + dbConfig.password + app_constants_1.APP_CONST.CHAR.AT + dbConfig.cluster + app_constants_1.APP_CONST.CHAR.SLASH + dbConfig.database + app_constants_1.APP_CONST.CHAR.QUESTION + dbConfig.clusterOptions;
        const conn = await database_1.MongoService.getMongoConnection(connUrl, dbConfig.connectionTm, dbConfig.keepAlive).catch((err) => {
            console.log('getting err:', err);
            throw new custom_error_model_1.CustomErrorModel(500, 'APP', err.message, 500);
        });
    }
    static getAdapter() {
        const appConfig = app_config_service_1.AppConfigService.getAppConfig();
        return new platform_fastify_1.FastifyAdapter({
            ignoreTrailingSlash: false,
            caseSensitive: true,
            genReqId: () => (0, uuid_1.v4)().toString(),
            trustProxy: true,
            pluginTimeout: appConfig.timeout,
            requestIdHeader: 'req-id',
        });
    }
}
exports.ServerAdapterService = ServerAdapterService;


/***/ }),
/* 44 */
/***/ ((module) => {

module.exports = require("uuid");

/***/ }),
/* 45 */
/***/ ((module) => {

module.exports = require("@nestjs/platform-fastify");

/***/ }),
/* 46 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(47), exports);
__exportStar(__webpack_require__(48), exports);
__exportStar(__webpack_require__(49), exports);


/***/ }),
/* 47 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseModule = void 0;
const common_1 = __webpack_require__(3);
const mongo_service_1 = __webpack_require__(48);
const neo4j_service_1 = __webpack_require__(49);
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = __decorate([
    (0, common_1.Module)({
        providers: [mongo_service_1.MongoService, neo4j_service_1.Neo4jService],
        exports: [mongo_service_1.MongoService, neo4j_service_1.Neo4jService],
    })
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;


/***/ }),
/* 48 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MongoService = void 0;
const common_1 = __webpack_require__(3);
const mongoose = __webpack_require__(39);
const common_2 = __webpack_require__(8);
let MongoService = class MongoService {
    constructor() { }
    static async getMongoConnection(connUrl, connTimeOutMs, keepAlive) {
        mongoose.set('bufferCommands', false);
        return new Promise((resolve, reject) => {
            mongoose
                .connect(connUrl, { logger: common_2.PinoLoggerService, useNewUrlParser: true, useUnifiedTopology: true, writeConcern: { w: 'majority', j: true } })
                .then((connDetails) => {
                resolve(connDetails);
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
};
MongoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MongoService);
exports.MongoService = MongoService;


/***/ }),
/* 49 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Neo4jService = void 0;
const common_1 = __webpack_require__(3);
let Neo4jService = class Neo4jService {
};
Neo4jService = __decorate([
    (0, common_1.Injectable)()
], Neo4jService);
exports.Neo4jService = Neo4jService;


/***/ }),
/* 50 */
/***/ ((module) => {

module.exports = require("fastify-helmet");

/***/ }),
/* 51 */
/***/ ((module) => {

module.exports = require("dotenv");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const app_module_1 = __webpack_require__(2);
const common_module_1 = __webpack_require__(19);
const header_interceptor_1 = __webpack_require__(23);
const app_config_service_1 = __webpack_require__(28);
const server_adapter_service_1 = __webpack_require__(43);
const path = __webpack_require__(41);
const custom_exception_filter_1 = __webpack_require__(20);
(async function bootstrap() {
    try {
        if (process.env.NODE_ENV === 'dev') {
            console.log('into config');
            __webpack_require__(51).config({ path: path.join(__dirname, './config/development/.env') });
        }
        const appConfig = app_config_service_1.AppConfigService.getAppConfig();
        const app = await core_1.NestFactory.create(app_module_1.AppModule, server_adapter_service_1.ServerAdapterService.getAdapter());
        const corsInterceptorInstance = app.select(common_module_1.CommonModule).get(header_interceptor_1.HeaderInterceptor, { strict: false });
        const headerInterceptorInstance = app.select(common_module_1.CommonModule).get(header_interceptor_1.HeaderInterceptor, { strict: false });
        const exceptionFilter = app.select(common_module_1.CommonModule).get(custom_exception_filter_1.CustomExceptionFilter, { strict: false });
        await server_adapter_service_1.ServerAdapterService.configureDbConnection(app);
        app.useGlobalInterceptors(corsInterceptorInstance, headerInterceptorInstance);
        app.useGlobalPipes();
        app.useGlobalFilters(exceptionFilter);
        await app.listen(appConfig.port, appConfig.host).then(() => {
            console.log('App started in port:' + appConfig.port);
        });
    }
    catch (err) {
        process.stderr.write(`Error creating app:${err}`);
        process.exit(1);
    }
})();
process.on('unhandledRejection', (err) => {
    process.stderr.write(`Error  - unhandled rejection in app:${err}`);
    process.exit(1);
});

})();

/******/ })()
;