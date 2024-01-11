import { Injectable } from '@nestjs/common';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  create(): Promise<Student> {
    const newStudent = this.studentRepository.create();

    return this.studentRepository.save(newStudent);
  }

  findOne(id: number): Promise<Student> {
    return this.studentRepository.findOne({
      where: { id },
    });
  }
}
