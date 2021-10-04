import { Expose } from 'class-transformer';
export class ESConfigModel {
	@Expose()
	esCluster: string;
	@Expose()
	esPort: number;
	@Expose()
	esUserName: string;
	@Expose()
	esPassword: string;
	@Expose()
	esRetries: number;
}
