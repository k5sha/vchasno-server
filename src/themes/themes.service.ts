import { Injectable } from '@nestjs/common';
import { CreateThemeInput } from './dto/create-theme.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Theme } from './entities/theme.entity';

@Injectable()
export class ThemesService {
  constructor(
    @InjectRepository(Theme) private themesRepository: Repository<Theme>,
  ) {}

  async create(createThemeInput: CreateThemeInput): Promise<Theme> {
    const theme = await this.themesRepository.findOne({
      where: { title: createThemeInput.title },
    });

    if (theme) {
      throw new Error('Theme already exists!');
    }

    const newTheme = this.themesRepository.create(createThemeInput);

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
