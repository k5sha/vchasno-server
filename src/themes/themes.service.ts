import { Injectable } from '@nestjs/common';
import { CreateThemeInput } from './dto/create-theme.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Theme } from './entities/theme.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class ThemesService {
  constructor(
    @InjectRepository(Theme) private themesRepository: Repository<Theme>,
    private usersService: UsersService,
  ) {}

  async create(createThemeInput: CreateThemeInput): Promise<Theme> {
    const theme = await this.themesRepository.findOne({
      where: { title: createThemeInput.title },
    });

    if (theme) {
      throw new Error('Theme already exists!');
    }

    const teacher = await this.usersService.findOneById(
      createThemeInput.teacherId,
    );

    if (!teacher) {
      throw new Error('Teacher not exists!');
    }

    const newTheme: Theme = this.themesRepository.create(createThemeInput);
    newTheme.teacher = teacher;
    return this.themesRepository.save(newTheme);
  }

  findAll(): Promise<Theme[]> {
    return this.themesRepository.find();
  }

  findOne(id: number): Promise<Theme> {
    return this.themesRepository.findOne({
      where: { id },
    });
  }

  remove(id: number): number {
    this.themesRepository.delete(id);
    return id;
  }
}
