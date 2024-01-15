import { ObjectType, Field } from '@nestjs/graphql';
import { Theme } from 'src/themes/entities/theme.entity';
import { Teacher } from 'src/teachers/entities/teacher.entity';

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

  @Column()
  @Field()
  date: Date;

  @Field(() => Teacher)
  @ManyToOne(() => Teacher, (teacher) => teacher.lessons)
  teacher: Teacher;

  @ManyToOne(() => Theme, (theme) => theme.lessons)
  @Field(() => Theme, { nullable: true })
  theme?: Theme;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
