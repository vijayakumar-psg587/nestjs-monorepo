import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/test')
  getHello() {
    const msg: string = this.appService.getHello({ name: 'vv' });
    return { message: msg };
  }
}
