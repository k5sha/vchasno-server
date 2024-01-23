import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserInfoService } from './user-info.service';
import { UserInfo } from './entities/userInfo.entity';
import { UpdateUserInfo } from './dto/update-userInfo.input';

@Resolver(() => UserInfo)
export class UserInfoResolver {
  constructor(private readonly userInfoService: UserInfoService) {}

  @Query(() => UserInfo, { name: 'userInfo' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userInfoService.findOne(id);
  }

  @Mutation(() => UserInfo)
  updateUserInfo(@Args('updateUserInfo') updateUserInfo: UpdateUserInfo) {
    return this.userInfoService.update(updateUserInfo.id, updateUserInfo);
  }

  @Mutation(() => UserInfo)
  removeUserInfo(@Args('id', { type: () => Int }) id: number) {
    return this.userInfoService.remove(id);
  }
}
