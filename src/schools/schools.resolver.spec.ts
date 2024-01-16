import { Test, TestingModule } from '@nestjs/testing';
import { SchoolsResolver } from './schools.resolver';
import { SchoolsService } from './schools.service';

describe('SchoolsResolver', () => {
  let resolver: SchoolsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchoolsResolver, SchoolsService],
    }).compile();

    resolver = module.get<SchoolsResolver>(SchoolsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
