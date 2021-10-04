import { Injectable } from '@nestjs/common';
import { logDecorator } from './modules/common/decorators/log.decorator';

@Injectable()
export class AppService {
  @logDecorator('AppService')
  getHello(s: Record<string, unknown>): string {
    return 'Hello World!';
  }
}
