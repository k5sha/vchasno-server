import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Teacher } from 'src/users/entities/teacher.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// TODO: th eme entity
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
  @Field(() => Int)
  teacherId: number;

  @Field(() => Teacher)
  @ManyToOne(() => Teacher, (teacher) => teacher.lessons)
  teacher: Teacher;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
