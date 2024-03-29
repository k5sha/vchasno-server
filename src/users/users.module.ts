import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { SubjectsModule } from 'src/subjects/subjects.module';
import { TeachersModule } from 'src/teachers/teachers.module';
import { StudentsModule } from 'src/students/students.module';
import { UserInfoModule } from 'src/user-info/user-info.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    SubjectsModule,
    TeachersModule,
    StudentsModule,
    UserInfoModule,
  ],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
