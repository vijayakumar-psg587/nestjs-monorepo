import { Expose } from 'class-transformer';
import { AppUtilService } from '@app/common/utils/app-util/app-util.service';

export class CustomErrorModel {
	constructor(code?, message?, status?) {
		this.code = code;
		this.message = message;
		this.status = status;
		this.timestamp = AppUtilService.getAppLevelDefaultUTCTime();
	}
	@Expose()
	code: string;
	@Expose()
	message: string | Record<string, unknown>;
	@Expose()
	status: number;
	@Expose()
	timestamp: string;
}
