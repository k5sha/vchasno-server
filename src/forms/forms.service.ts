import { Injectable } from '@nestjs/common';
import { Form } from './entities/form.entity';
import { CreateFormInput } from './dto/create-form.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddSubjectToFormInput } from './dto/addSubject-form.input';
import { SubjectsService } from 'src/subjects/subjects.service';
import { SetClassTeacherFormInput } from './dto/setTeacher-form.input';
import { DeleteClassTeacherFormInput } from './dto/deleteTeacher-form.input copy';
import { TeachersService } from 'src/teachers/teachers.service';

@Injectable()
export class FormsService {
  constructor(
    @InjectRepository(Form) private formRepository: Repository<Form>,
    private subjectsService: SubjectsService,
    private teachersService: TeachersService,
  ) {}

  async create(createFormInput: CreateFormInput): Promise<Form> {
    const form = await this.formRepository.findOne({
      where: { title: createFormInput.title },
    });

    if (form) {
      throw new Error('Form already exists!');
    }

    const newForm = this.formRepository.create(createFormInput);

    return this.formRepository.save(newForm);
  }
  findAll(): Promise<Form[]> {
    return this.formRepository.find();
  }

  findOne(id: number): Promise<Form> {
    return this.formRepository.findOne({
      where: { id },
    });
  }

  async deleteClassTeacher(
    deleteClassTeacherFormInput: DeleteClassTeacherFormInput,
  ) {
    const form = await this.findOne(deleteClassTeacherFormInput.formId);

    if (!form) {
      throw new Error('Form not exists!');
    }

    if (
      !form.class_teacher ||
      !(form.class_teacher.id == deleteClassTeacherFormInput.teacherId)
    ) {
      throw new Error('Teacher already deleted or teacher id incorrect!');
    }

    const teacher = await this.teachersService.findOne(
      deleteClassTeacherFormInput.teacherId,
    );

    if (!teacher) {
      throw new Error('Teacher not exists!');
    }

    form.class_teacher = null;

    return this.formRepository.save(form);
  }

  async setClassTeacher(setClassTeacherFormInput: SetClassTeacherFormInput) {
    const form = await this.findOne(setClassTeacherFormInput.formId);

    if (!form) {
      throw new Error('Form not exists!');
    }

    if (
      form.class_teacher &&
      form.class_teacher.id == setClassTeacherFormInput.teacherId
    ) {
      throw new Error('Teacher already set!');
    }

    const teacher = await this.teachersService.findOne(
      setClassTeacherFormInput.teacherId,
    );

    if (!teacher) {
      throw new Error('Teacher not exists!');
    }

    form.class_teacher = teacher;

    return this.formRepository.save(form);
  }

  async addSubjectToForm(addSubjectToFormInput: AddSubjectToFormInput) {
    const form = await this.findOne(addSubjectToFormInput.formId);

    if (!form) {
      throw new Error('Form not exists!');
    }

    const subject = await this.subjectsService.findOne(
      addSubjectToFormInput.subjectId,
    );

    if (!subject) {
      throw new Error('Subject not exists!');
    }

    if (
      form.subjects.some((old_subjects) => old_subjects.title == subject.title)
    ) {
      throw new Error('Subject already added!');
    }

    form.subjects.push(subject);

    return this.formRepository.save(form);
  }

  remove(id: number): number {
    this.formRepository.delete(id);
    return id;
  }
}
