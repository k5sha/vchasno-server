import { Module } from '@nestjs/common';
import { MarksService } from './marks.service';
import { MarksResolver } from './marks.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mark } from './entities/mark.entity';
import { TeachersModule } from 'src/teachers/teachers.module';
import { StudentsModule } from 'src/students/students.module';
import { LessonsModule } from 'src/lessons/lessons.module';
import { SubjectsModule } from 'src/subjects/subjects.module';
import { FormsModule } from 'src/forms/forms.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mark]),
    TeachersModule,
    StudentsModule,
    LessonsModule,
    SubjectsModule,
    FormsModule,
  ],
  providers: [MarksResolver, MarksService],
})
export class MarksModule {}
