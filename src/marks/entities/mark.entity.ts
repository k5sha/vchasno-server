import { ObjectType, Field } from '@nestjs/graphql';
import { Form } from 'src/forms/entities/form.entity';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { Student } from 'src/students/entities/student.entity';
import { Subject } from 'src/subjects/entities/subject.entity';
import { Teacher } from 'src/teachers/entities/teacher.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

@Entity()
@ObjectType()
export class Mark {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  mark: number;

  @ManyToOne(() => Student, (student) => student.marks, { cascade: true })
  @Field(() => Student)
  student: Student;

  @ManyToOne(() => Teacher, { cascade: true })
  @Field(() => Teacher)
  teacher: Teacher;

  @ManyToOne(() => Form, { cascade: true })
  @Field(() => Form)
  form: Form;

  @ManyToOne(() => Subject, { cascade: true })
  @Field(() => Subject)
  subject: Subject;

  @ManyToOne(() => Lesson, { cascade: true })
  @Field(() => Lesson)
  lesson: Lesson;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
