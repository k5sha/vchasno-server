import { Test, TestingModule } from '@nestjs/testing';
import { FormsResolver } from './forms.resolver';
import { FormsService } from './forms.service';

describe('FormsResolver', () => {
  let resolver: FormsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormsResolver, FormsService],
    }).compile();

    resolver = module.get<FormsResolver>(FormsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
