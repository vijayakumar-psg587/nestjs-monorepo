import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import * as dateFns from 'date-fns';
import * as locale from 'date-fns/locale';
import { COMMON_CONST } from '@app/common/utils/common.constants';
@Scalar('Date', (type) => String)
export class DateScalar implements CustomScalar<number, string> {
	description: 'Custom implementation for date in epoch timestamp milliseconds';

	parseLiteral(valueNode: ValueNode): Maybe<string> {
		if (valueNode.kind === Kind.INT) {
			// convert the timestamp seconds to whatever locale it is intended
			return dateFns.format(new Date(valueNode.value), COMMON_CONST.COMMON.DEFAULT_DATE_TIME_FORMAT, { locale: locale.enUS });
		}
		return null;
	}

	parseValue(value: number): Maybe<string> {
		return dateFns.format(new Date(value), COMMON_CONST.COMMON.DEFAULT_DATE_TIME_FORMAT, { locale: locale.enUS });
	}

	serialize(value: string): Maybe<number> {
		return new Date(value).getTime();
	}
}
