import { Module } from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { UserInfoResolver } from './user-info.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfo } from './entities/userInfo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserInfo])],
  providers: [UserInfoResolver, UserInfoService],
  exports: [UserInfoService],
})
export class UserInfoModule {}
