import { Injectable } from '@nestjs/common';
import { CreateThemeInput } from './dto/create-theme.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Theme } from './entities/theme.entity';
import { TeachersService } from 'src/teachers/teachers.service';
import { SubjectsService } from 'src/subjects/subjects.service';
import { FormsService } from 'src/forms/forms.service';

@Injectable()
export class ThemesService {
  constructor(
    @InjectRepository(Theme) private themesRepository: Repository<Theme>,
    private teachersService: TeachersService,
    private subjectsService: SubjectsService,
    private formsService: FormsService,
  ) {}

  async create(createThemeInput: CreateThemeInput): Promise<Theme> {
    const teacher = await this.teachersService.findOne(
      createThemeInput.teacherId,
    );

    if (!teacher) {
      throw new Error('Teacher not exists!');
    }
    const subject = await this.subjectsService.findOne(
      createThemeInput.subjectId,
    );

    if (!subject) {
      throw new Error('Subject not exists!');
    }

    const form = await this.formsService.findOne(createThemeInput.formId);

    if (!form) {
      throw new Error('Form not exists!');
    }

    const theme = await this.themesRepository.findOne({
      where: { title: createThemeInput.title, teacher, subject, form },
    });

    if (theme) {
      throw new Error('Theme already exists!');
    }

    const newTheme = this.themesRepository.create(createThemeInput);
    newTheme.teacher = teacher;
    newTheme.subject = subject;
    newTheme.form = form;
    return this.themesRepository.save(newTheme);
  }

  findAll(): Promise<Theme[]> {
    return this.themesRepository.find({
      relations: { subject: true, teacher: true, form: true },
    });
  }

  findOne(id: number): Promise<Theme> {
    return this.themesRepository.findOne({
      where: { id },
      relations: { subject: true, teacher: true, form: true },
    });
  }

  remove(id: number): number {
    this.themesRepository.delete(id);
    return id;
  }
}
