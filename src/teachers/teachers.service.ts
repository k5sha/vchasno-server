import { Injectable } from '@nestjs/common';
import { Teacher } from './entities/teacher.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher) private teacherRepository: Repository<Teacher>,
  ) {}

  create(): Promise<Teacher> {
    const newTeacher = this.teacherRepository.create();

    return this.teacherRepository.save(newTeacher);
  }

  findOne(id: number): Promise<Teacher> {
    return this.teacherRepository.findOne({
      where: { id },
      relations: { school: true },
    });
  }
}
