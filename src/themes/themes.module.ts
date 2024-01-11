import { Module } from '@nestjs/common';
import { ThemesService } from './themes.service';
import { ThemesResolver } from './themes.resolver';
import { Theme } from './entities/theme.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeachersModule } from 'src/teachers/teachers.module';
import { SubjectsModule } from 'src/subjects/subjects.module';
import { FormsModule } from 'src/forms/forms.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Theme]),
    TeachersModule,
    SubjectsModule,
    FormsModule,
  ],
  providers: [ThemesResolver, ThemesService],
  exports: [ThemesService],
})
export class ThemesModule {}
