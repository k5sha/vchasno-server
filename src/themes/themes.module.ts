import { Module } from '@nestjs/common';
import { ThemesService } from './themes.service';
import { ThemesResolver } from './themes.resolver';
import { Theme } from './entities/theme.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Theme])],
  providers: [ThemesResolver, ThemesService],
})
export class ThemesModule {}
