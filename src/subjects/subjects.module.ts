import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsResolver } from './subjects.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subject])],
  providers: [SubjectsResolver, SubjectsService],
  exports: [SubjectsService],
})
export class SubjectsModule {}
