import { Injectable } from '@nestjs/common';
import { CreateSubjectInput } from './dto/create-subject.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './entities/subject.entity';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject) private subjectRepository: Repository<Subject>,
  ) {}

  async create(createSubjectInput: CreateSubjectInput): Promise<Subject> {
    const subject = await this.subjectRepository.findOne({
      where: { title: createSubjectInput.title },
    });

    if (subject) {
      throw new Error('Subject already exists!');
    }

    const newSubject = this.subjectRepository.create(createSubjectInput);

    return this.subjectRepository.save(newSubject);
  }
  findAll(): Promise<Subject[]> {
    return this.subjectRepository.find();
  }

  findOne(id: number): Promise<Subject> {
    return this.subjectRepository.findOne({
      where: { id },
    });
  }

  remove(id: number): number {
    this.subjectRepository.delete(id);
    return id;
  }
}
