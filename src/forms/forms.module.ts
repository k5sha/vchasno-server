import { Module } from '@nestjs/common';
import { FormsService } from './forms.service';
import { FormsResolver } from './forms.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from './entities/form.entity';
import { SubjectsModule } from 'src/subjects/subjects.module';
import { TeachersModule } from 'src/teachers/teachers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Form]), SubjectsModule, TeachersModule],
  providers: [FormsResolver, FormsService],
  exports: [FormsService],
})
export class FormsModule {}
