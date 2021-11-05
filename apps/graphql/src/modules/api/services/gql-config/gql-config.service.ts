import { forwardRef, Inject, Injectable, Scope } from '@nestjs/common';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql/dist/interfaces/gql-module-options.interface';
import { MongoService } from '@app/database';
import * as path from 'path';
import { AppConfigService } from '../../../common/services/app-config/app-config.service';
import { APP_CONST } from '../../../common/utils/app.constants';
import { CustomErrorModel } from '../../../common/models/exception/custom-error.model';
@Injectable({
	scope: Scope.REQUEST,
})
export class GqlConfigService implements GqlOptionsFactory {
	constructor() {}
	async createGqlOptions(): Promise<GqlModuleOptions> {
		return new Promise(async (resolve, reject) => {
			let graphQlModuleOptions: GqlModuleOptions = {};
			graphQlModuleOptions.autoTransformHttpErrors = true;
			graphQlModuleOptions.autoSchemaFile = path.join(process.cwd(), 'apps/graphql/schema/schema.gql');
			graphQlModuleOptions.playground = true;
			graphQlModuleOptions.sortSchema = true;
			resolve(graphQlModuleOptions);
		});
	}
}
