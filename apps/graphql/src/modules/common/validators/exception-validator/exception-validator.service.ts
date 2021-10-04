import { HttpStatus, Injectable, ValidationError } from '@nestjs/common';
import { CustomErrorModel } from '../../models/exception/custom-error.model';
import { ErrorTypes } from '../../models/enum/error-type.enum';
import { APP_CONST } from '../../utils/app.constants';
import os from 'os';

@Injectable()
export class ExceptionValidatorService {
	static handleCustomException(errorCode: number, type: string, customMsg: string) {
		const customErr = new CustomErrorModel();
		if (type === ErrorTypes.VALIDATION) {
			customErr.code = ErrorTypes.VALIDATION;
			customErr.status = 421;
		} else if (type === ErrorTypes.REQ) {
			customErr.code = ErrorTypes.REQ;
			customErr.status = 424;
		} else if (type === ErrorTypes.DB) {
			customErr.code = ErrorTypes.DB;
			customErr.status = 425;
		} else {
			customErr.code = type;
			customErr.status = 500;
		}

		customErr.message = customMsg;
		customErr.timestamp = 'test'; // Need to determine best way to put timestamp here
		return customErr;
	}

	static customValidationExceptionFactory(errors: ValidationError[]) {
		const customError = new CustomErrorModel();
		customError.code = '400';
		customError.timestamp = 'test';

		customError.status = HttpStatus.BAD_REQUEST;
		let errMessage = '';
		errors.forEach((err) => {
			errMessage = errMessage === '' ? ExceptionValidatorService.getValidationErrorMessage(err) : errMessage.concat(APP_CONST.CHAR.HYPHEN).concat(ExceptionValidatorService.getValidationErrorMessage(err));
		});

		console.log('final Error message:', errMessage);
		customError.message = errMessage;
		throw customError;
	}

	static getValidationErrorMessage(err: ValidationError): string {
		let targetName = '';
		if (err && err.target) {
			if (err.target.constructor) {
				targetName = err.target.constructor.name;
			} else {
				targetName = err.target.name;
			}
		}
		return (
			`Validation err for - ${targetName} with property - ${err.property} -value - ${err.value}
      has the constraints - ${JSON.stringify(err.constraints)}` + os.EOL
		);
	}
}
