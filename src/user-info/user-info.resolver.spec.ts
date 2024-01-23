import { Test, TestingModule } from '@nestjs/testing';
import { UserInfoResolver } from './user-info.resolver';
import { UserInfoService } from './user-info.service';

describe('UserInfoResolver', () => {
  let resolver: UserInfoResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserInfoResolver, UserInfoService],
    }).compile();

    resolver = module.get<UserInfoResolver>(UserInfoResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
