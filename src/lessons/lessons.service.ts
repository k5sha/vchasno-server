import { Injectable } from '@nestjs/common';
import { CreateLessonInput } from './dto/create-lesson.input';
import { Lesson } from './entities/lesson.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ThemesService } from '../themes/themes.service';
import { TeachersService } from '../teachers/teachers.service';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
    private teachersService: TeachersService,
    private themesService: ThemesService,
  ) {}

  async create(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const teacher = await this.teachersService.findOne(
      createLessonInput.teacherId,
    );

    if (!teacher) {
      throw new Error('Teacher not exist');
    }

    const lesson = await this.lessonRepository.findOne({
      where: {
        title: createLessonInput.title,
        teacher,
      },
    });

    if (lesson) {
      throw new Error('Lesson already exists!');
    }

    const newLesson = this.lessonRepository.create(createLessonInput);

    newLesson.teacher = teacher;

    if (createLessonInput.themeId != 0) {
      const theme = await this.themesService.findOne(createLessonInput.themeId);

      if (!theme) {
        throw new Error('Theme not exist');
      }

      newLesson.theme = theme;
    }

    return this.lessonRepository.save(newLesson);
  }
  findAll(): Promise<Lesson[]> {
    return this.lessonRepository.find({
      relations: {
        teacher: true,
        theme: true,
      },
    });
  }

  findOne(id: number): Promise<Lesson> {
    return this.lessonRepository.findOne({
      where: { id },
      relations: {
        teacher: true,
        theme: true,
      },
    });
  }

  remove(id: number): number {
    this.lessonRepository.delete(id);
    return id;
  }
}
