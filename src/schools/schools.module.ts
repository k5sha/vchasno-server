import { Module } from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { SchoolsResolver } from './schools.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School } from './entities/school.entity';
import { TeachersModule } from 'src/teachers/teachers.module';
import { StudentsModule } from 'src/students/students.module';
import { FormsModule } from 'src/forms/forms.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([School]),
    TeachersModule,
    StudentsModule,
    FormsModule,
  ],
  providers: [SchoolsResolver, SchoolsService],
})
export class SchoolsModule {}
