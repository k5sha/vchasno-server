import { ObjectType, Field } from '@nestjs/graphql';
import {
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { Subject } from 'src/subjects/entities/subject.entity';

@Entity()
@ObjectType()
export class Teacher {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @OneToMany(() => Lesson, (lesson) => lesson.teacher, { eager: true })
  @Field(() => [Lesson], { nullable: true })
  lessons?: Lesson[];

  @ManyToMany(() => Subject, { eager: true })
  @Field(() => [Subject])
  @JoinTable()
  subjects: Subject[];
}
