import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { SubjectsService } from 'src/subjects/subjects.service';
import { AddSubjectInput } from './dto/addSubject-user.input';
import { TeachersService } from '../teachers/teachers.service';
import { StudentsService } from '../students/students.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private teachersService: TeachersService,
    private studentsService: StudentsService,
    private subjectsService: SubjectsService,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const newUser = this.userRepository.create(createUserInput);

    if (createUserInput.type == 'TEACHER') {
      const teacherAccount = await this.teachersService.create();

      newUser.teacher = teacherAccount;
    } else {
      const studentAccount = await this.studentsService.create();

      newUser.student = studentAccount;
    }

    return this.userRepository.save(newUser);
  }

  findOneById(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: {
        teacher: true,
        student: true,
      },
    });
  }

  findOneByUsername(username: string) {
    return this.userRepository.findOne({
      where: { username },
      relations: {
        teacher: true,
        student: true,
      },
    });
  }

  async addSubjectToTeacher(addSubjectInput: AddSubjectInput) {
    const user = await this.findOneById(addSubjectInput.teacherId);

    if (!user || !user.teacher) {
      throw new Error('Teacher not exists!');
    }

    const teacher = user.teacher;

    const subject = await this.subjectsService.findOne(
      addSubjectInput.subjectId,
    );

    if (!subject) {
      throw new Error('Subject not exists!');
    }

    if (
      teacher.subjects.some(
        (old_subjects) => old_subjects.title == subject.title,
      )
    ) {
      throw new Error('Subject already added!');
    }

    teacher.subjects.push(subject);

    return this.userRepository.save(teacher);
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return this.userRepository.update(id, updateUserInput);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
