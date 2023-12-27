import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsResolver } from './lessons.resolver';

@Module({
  providers: [LessonsResolver, LessonsService],
})
export class LessonsModule {}
