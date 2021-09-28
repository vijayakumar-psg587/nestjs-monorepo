import { Expose } from 'class-transformer';

export class CustomErrorModel {
  @Expose()
  code: string;
  @Expose()
  message: string | Record<string, unknown>;
  @Expose()
  status: number;
  @Expose()
  timestamp: string;
}
