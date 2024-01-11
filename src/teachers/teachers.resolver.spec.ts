import { Test, TestingModule } from '@nestjs/testing';
import { TeachersResolver } from './teachers.resolver';
import { TeachersService } from './teachers.service';

describe('TeachersResolver', () => {
  let resolver: TeachersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeachersResolver, TeachersService],
    }).compile();

    resolver = module.get<TeachersResolver>(TeachersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
