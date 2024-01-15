import { Test, TestingModule } from '@nestjs/testing';
import { MarksResolver } from './marks.resolver';
import { MarksService } from './marks.service';

describe('MarksResolver', () => {
  let resolver: MarksResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarksResolver, MarksService],
    }).compile();

    resolver = module.get<MarksResolver>(MarksResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
