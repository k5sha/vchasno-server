import { Module } from '@nestjs/common';
import { FormsService } from './forms.service';
import { FormsResolver } from './forms.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Form } from './entities/form.entity';
import { Subject } from '../subjects/entities/subject.entity';
import { SubjectsModule } from 'src/subjects/subjects.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Form, Subject, User]),
    SubjectsModule,
    UsersModule,
  ],
  providers: [FormsResolver, FormsService],
  exports: [FormsService],
})
export class FormsModule {}
