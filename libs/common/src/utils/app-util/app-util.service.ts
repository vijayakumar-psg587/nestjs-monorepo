import { Injectable, Scope } from '@nestjs/common';
import * as dateFns from 'date-fns';
import * as locale from 'date-fns/locale';
import { COMMON_CONST } from '@app/common/utils/common.constants';
@Injectable({
	scope: Scope.DEFAULT,
})
export class AppUtilService {
	static getAppLevelDefaultUTCTime() {
		return dateFns.format(Date.now(), COMMON_CONST.COMMON.DEFAULT_DATE_TIME_FORMAT, { locale: locale.enIN });
	}
}
