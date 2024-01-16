import { Injectable } from '@nestjs/common';
import { CreateSchoolInput } from './dto/create-school.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { School } from './entities/school.entity';
import { AddTeacherToSchoolInput } from './dto/addTeacherToSchool.input';
import { TeachersService } from '../teachers/teachers.service';
import { AddStudentToSchoolInput } from './dto/addStudentToSchool.input';
import { StudentsService } from 'src/students/students.service';
import { AddFormToSchoolInput } from './dto/addFormToSchool.input';
import { FormsService } from 'src/forms/forms.service';

@Injectable()
export class SchoolsService {
  constructor(
    @InjectRepository(School) private schoolRepository: Repository<School>,
    private formsService: FormsService,
    private teachersService: TeachersService,
    private studentsService: StudentsService,
  ) {}

  async create(createSchoolInput: CreateSchoolInput): Promise<School> {
    const school = await this.schoolRepository.findOne({
      where: { title: createSchoolInput.title },
    });

    if (school) {
      throw new Error('School already exists!');
    }

    const newSubject = this.schoolRepository.create(createSchoolInput);

    return this.schoolRepository.save(newSubject);
  }

  async addFormToSchool(addFormToSchoolInput: AddFormToSchoolInput) {
    const form = await this.formsService.findOne(addFormToSchoolInput.formId);

    if (!form) {
      throw new Error('Form not exists!');
    }

    const school = await this.findOne(addFormToSchoolInput.schoolId);

    if (!school) {
      throw new Error('School not exists!');
    }

    if (form.school && form.school.id == school.id) {
      throw new Error('Form already added to this school');
    }

    if (!school.forms) {
      school.forms = [form];
    } else {
      school.forms.push(form);
    }

    return this.schoolRepository.save(school);
  }

  async addTeacherToSchool(addTeacherToSchoolInput: AddTeacherToSchoolInput) {
    const teacher = await this.teachersService.findOne(
      addTeacherToSchoolInput.teacherId,
    );

    if (!teacher) {
      throw new Error('Teacher not exists!');
    }

    const school = await this.findOne(addTeacherToSchoolInput.schoolId);

    if (!school) {
      throw new Error('School not exists!');
    }

    if (teacher.school && teacher.school.id == school.id) {
      throw new Error('Teacher already in this school');
    }

    if (!school.teachers) {
      school.teachers = [teacher];
    } else {
      school.teachers.push(teacher);
    }

    return this.schoolRepository.save(school);
  }

  async addStudentToSchool(addStudentToSchoolInput: AddStudentToSchoolInput) {
    const student = await this.studentsService.findOne(
      addStudentToSchoolInput.studentId,
    );

    if (!student) {
      throw new Error('Student not exists!');
    }

    const school = await this.findOne(addStudentToSchoolInput.schoolId);

    if (!school) {
      throw new Error('School not exists!');
    }

    if (student.school && student.school.id == school.id) {
      throw new Error('Student already in this school');
    }

    if (!school.students) {
      school.students = [student];
    } else {
      school.students.push(student);
    }

    return this.schoolRepository.save(school);
  }

  findAll(): Promise<School[]> {
    return this.schoolRepository.find();
  }

  findOne(id: number): Promise<School> {
    return this.schoolRepository.findOne({
      where: { id },
    });
  }

  remove(id: number): number {
    this.schoolRepository.delete(id);
    return id;
  }
}
