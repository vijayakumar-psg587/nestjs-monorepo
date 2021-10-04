import { Injectable } from '@nestjs/common';
import { COMMON_CONST } from '@app/common/utils/common.constants';

@Injectable()
export class AxiosConfigService {
	/**
	 * This varies for each request, hence setting it via a method
	 * @param trackingId
	 * @param userID
	 * @param principalRole
	 */
	static setAxiosRequestHeaders(trackingId: string, userID: string, principalRole: string) {
		return {
			'CS-APP-NAME': COMMON_CONST.COMMON.APP_NAME,
			'CS-LOG-TRACKING-ID': trackingId,
			'CS-USER-TYPE': userID,
			'CS-CONSUMER-APP-PROCESS': 'PM' + trackingId,
			'CS-PRINCIPAL-ROLE': principalRole,
		};
	}
}
