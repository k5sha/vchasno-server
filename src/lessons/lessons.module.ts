import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsResolver } from './lessons.resolver';
import { Lesson } from './entities/lesson.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThemesModule } from 'src/themes/themes.module';
import { TeachersModule } from 'src/teachers/teachers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson]), TeachersModule, ThemesModule],
  providers: [LessonsResolver, LessonsService],
})
export class LessonsModule {}
