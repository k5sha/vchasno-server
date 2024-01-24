import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UserInfoService } from './user-info.service';
import { UserInfo } from './entities/userInfo.entity';
import { UpdateUserInfo } from './dto/update-userInfo.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver(() => UserInfo)
export class UserInfoResolver {
  constructor(private readonly userInfoService: UserInfoService) {}

  @Query(() => UserInfo, { name: 'userInfo' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userInfoService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => UserInfo)
  updateUserInfo(
    @Args('updateUserInfo') updateUserInfo: UpdateUserInfo,
    @Context() context,
  ) {
    return this.userInfoService.update(context.req.user.userId, updateUserInfo);
  }

  @Mutation(() => UserInfo)
  removeUserInfo(@Args('id', { type: () => Int }) id: number) {
    return this.userInfoService.remove(id);
  }
}
