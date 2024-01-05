import { Injectable } from '@nestjs/common';
import { CreateLessonInput } from './dto/create-lesson.input';
import { Lesson } from './entities/lesson.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
    private usersService: UsersService,
  ) {}

  async create(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const teacher = await this.usersService.findOneById(
      createLessonInput.teacherId,
    );

    if (!teacher) {
      throw new Error('Teacher not exist');
    }

    const lesson = await this.lessonRepository.findOne({
      where: {
        title: createLessonInput.title,
        teacherId: createLessonInput.teacherId,
      },
    });

    if (lesson) {
      throw new Error('Lesson already exists!');
    }

    const newLesson = this.lessonRepository.create(createLessonInput);

    return this.lessonRepository.save(newLesson);
  }
  findAll(): Promise<Lesson[]> {
    return this.lessonRepository.find();
  }

  findOne(id: number): Promise<Lesson> {
    return this.lessonRepository.findOne({
      where: { id },
    });
  }

  remove(id: number): number {
    this.lessonRepository.delete(id);
    return id;
  }
}
