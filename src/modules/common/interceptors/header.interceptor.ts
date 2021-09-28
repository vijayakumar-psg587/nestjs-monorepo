import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor, Scope } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { Observable } from 'rxjs';
import { PrincipalRoleType } from '../models/enum/principal-role-type.enum';
import { UserIdType } from '../models/enum/user-type.enum';
import { CustomErrorModel } from '../models/exception/custom-error.model';
import { AppUtilService } from '../services/app-util/app-util.service';
import { APP_CONST } from '../utils/app.constants';

@Injectable({
	scope: Scope.DEFAULT,
})
export class HeaderInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const req: FastifyReply = context.switchToHttp().getRequest();
		// validate if request headers  -  USER type and Principal Role are of the required enums
		const headerGen = this.headerGenerator(req.headers);
		let genVal = null;
		let headerErrList: string[] = [];
		let itrFlag = true;
		while (itrFlag || (genVal && !genVal.done)) {
			genVal = headerGen.next();
			if (genVal.done) {
				itrFlag = false;
			}
			if (genVal && genVal.value && genVal.value.key === APP_CONST.HEADERS.CS_USER_TYPE.toLowerCase()) {
				headerErrList =
					Object.values(UserIdType).filter((item) => item.toLowerCase() === genVal.value.key).length > 1
						? headerErrList
						: (() => {
								const errMsg = `Request does not contain a valid UserIdType`;
								headerErrList.push(errMsg);
								return [...headerErrList];
						  })();
			}
			if (genVal && genVal.value && genVal.value.key === APP_CONST.HEADERS.CS_PRINCIPAL_ROLE.toLowerCase()) {
				headerErrList =
					Object.values(PrincipalRoleType).filter((item) => item.toLowerCase() === genVal.value.key).length > 1
						? headerErrList
						: (() => {
								const errMsg = `Request does not contain a valid PrincipalRole`;
								headerErrList.push(errMsg);
								return [...headerErrList];
						  })();
			}
		}

		if (headerErrList.length >= 1) {
			// there is an err =- make sure to throw that
			const errModel = new CustomErrorModel();
			errModel.code = '451';
			errModel.status = HttpStatus.BAD_REQUEST;
			errModel.timestamp = AppUtilService.getDefaultUTCTime();
			headerErrList.forEach((item) => {
				if (errModel.message) {
					errModel.message = errModel.message + ' : ' + item;
				} else {
					errModel.message = item;
				}
			});

			throw errModel;
		} else {
			return next.handle();
		}
		//return next.handle();
	}

	private *headerGenerator(headerObj: unknown) {
		// you can put the return type Generator<number>, but it is ot necessary as ts will infer
		for (const key of Object.keys(headerObj)) {
			console.log('key hereL', key);
			if (key.toLowerCase() === APP_CONST.HEADERS.CS_USER_TYPE.toLowerCase() || key.toLowerCase() === APP_CONST.HEADERS.CS_PRINCIPAL_ROLE.toLowerCase()) yield { key: key.toLowerCase(), value: headerObj[key].toLowerCase() };
		}
	}
}
