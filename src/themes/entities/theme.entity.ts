import { ObjectType, Field } from '@nestjs/graphql';
import { Form } from 'src/forms/entities/form.entity';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { Subject } from 'src/subjects/entities/subject.entity';
import { Teacher } from 'src/teachers/entities/teacher.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Theme {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  title: string;

  @OneToMany(() => Lesson, (lesson) => lesson.theme, { eager: true })
  @Field(() => [Lesson], { nullable: true })
  lessons?: Lesson[];

  @ManyToOne(() => Subject, { cascade: true })
  @Field(() => Subject)
  subject: Subject;

  @ManyToOne(() => Form, { cascade: true })
  @Field(() => Form)
  form: Form;

  @ManyToOne(() => Teacher, (teacher) => teacher.themes, { cascade: true })
  @Field(() => Teacher)
  teacher: Teacher;
}
