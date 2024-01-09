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
import { Theme } from 'src/themes/entities/theme.entity';

@Entity()
@ObjectType()
export class Teacher {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @OneToMany(() => Lesson, (lesson) => lesson.teacher, { eager: true })
  @Field(() => [Lesson], { nullable: true })
  lessons?: Lesson[];

  @OneToMany(() => Theme, (theme) => theme.teacher, { eager: true })
  @Field(() => [Theme], { nullable: true })
  themes?: Theme[];

  @ManyToMany(() => Subject, { eager: true })
  @Field(() => [Subject])
  @JoinTable()
  subjects: Subject[];
}
