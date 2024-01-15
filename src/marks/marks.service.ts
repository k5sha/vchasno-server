import { Injectable } from '@nestjs/common';
import { CreateMarkInput } from './dto/create-mark.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mark } from './entities/mark.entity';
import { StudentsService } from 'src/students/students.service';
import { SubjectsService } from 'src/subjects/subjects.service';
import { FormsService } from 'src/forms/forms.service';
import { TeachersService } from 'src/teachers/teachers.service';
import { LessonsService } from 'src/lessons/lessons.service';

@Injectable()
export class MarksService {
  constructor(
    @InjectRepository(Mark) private markRepository: Repository<Mark>,
    private teachersService: TeachersService,
    private subjectsService: SubjectsService,
    private studentsService: StudentsService,
    private formsService: FormsService,
    private lessonsService: LessonsService,
  ) {}

  async create(createMarkInput: CreateMarkInput): Promise<Mark> {
    const teacher = await this.teachersService.findOne(
      createMarkInput.teacherId,
    );

    if (!teacher) {
      throw new Error('Teacher not exists!');
    }
    const subject = await this.subjectsService.findOne(
      createMarkInput.subjectId,
    );

    if (!subject) {
      throw new Error('Subject not exists!');
    }

    const form = await this.formsService.findOne(createMarkInput.formId);

    if (!form) {
      throw new Error('Form not exists!');
    }

    const student = await this.studentsService.findOne(
      createMarkInput.studentId,
    );

    if (!student) {
      throw new Error('Student not exists!');
    }

    const lesson = await this.lessonsService.findOne(createMarkInput.lessonId);

    if (!student) {
      throw new Error('Student not exists!');
    }

    const mark = await this.markRepository.findOne({
      where: {
        mark: createMarkInput.mark,
        teacher,
        student,
        subject,
        form,
        lesson,
      },
    });

    if (mark) {
      throw new Error('Mark already exists!');
    }

    const newMark = this.markRepository.create(createMarkInput);
    newMark.teacher = teacher;
    newMark.subject = subject;
    newMark.form = form;
    newMark.lesson = lesson;
    newMark.student = student;
    return this.markRepository.save(newMark);
  }

  findAll(): Promise<Mark[]> {
    return this.markRepository.find({
      relations: {
        subject: true,
        teacher: true,
        form: true,
        student: true,
        lesson: true,
      },
    });
  }

  findOne(id: number): Promise<Mark> {
    return this.markRepository.findOne({
      where: { id },
      relations: {
        subject: true,
        teacher: true,
        form: true,
        student: true,
        lesson: true,
      },
    });
  }

  remove(id: number): number {
    this.markRepository.delete(id);
    return id;
  }
}
