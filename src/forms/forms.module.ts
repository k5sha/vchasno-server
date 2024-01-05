import { Module } from '@nestjs/common';
import { FormsService } from './forms.service';
import { FormsResolver } from './forms.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Form } from './entities/form.entity';
import { Subject } from '../subjects/entities/subject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Form, Subject, User])],
  providers: [FormsResolver, FormsService],
})
export class FormsModule {}
