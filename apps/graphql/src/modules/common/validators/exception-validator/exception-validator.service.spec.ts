import { Test, TestingModule } from '@nestjs/testing';
import { ExceptionValidatorService } from './exception-validator.service';

describe('ExceptionValidatorService', () => {
  let service: ExceptionValidatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExceptionValidatorService],
    }).compile();

    service = module.get<ExceptionValidatorService>(ExceptionValidatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
