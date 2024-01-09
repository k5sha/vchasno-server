import { ObjectType, Field } from '@nestjs/graphql';
import { Theme } from 'src/themes/entities/theme.entity';
import { Teacher } from 'src/users/entities/teacher.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Lesson {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  title: string;

  @Field(() => Teacher)
  @ManyToOne(() => Teacher, (teacher) => teacher.lessons)
  teacher: Teacher;

  @Field(() => Theme)
  @ManyToOne(() => Theme, (theme) => theme.lessons)
  theme: Theme;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
