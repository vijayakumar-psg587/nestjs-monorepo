import { Test, TestingModule } from '@nestjs/testing';
import { ConnConfigService } from './conn-config.service';

describe('ConnConfigService', () => {
  let service: ConnConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConnConfigService],
    }).compile();

    service = module.get<ConnConfigService>(ConnConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
