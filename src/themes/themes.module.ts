import { Module } from '@nestjs/common';
import { ThemesService } from './themes.service';
import { ThemesResolver } from './themes.resolver';
import { Theme } from './entities/theme.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Theme]), UsersModule],
  providers: [ThemesResolver, ThemesService],
})
export class ThemesModule {}
