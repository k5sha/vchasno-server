import { ObjectType, Field } from '@nestjs/graphql';
import { Subject } from 'src/subjects/entities/subject.entity';
import { Teacher } from 'src/teachers/entities/teacher.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Form {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  title: string;

  @OneToOne(() => Teacher, { eager: true })
  @Field(() => Teacher, { nullable: true })
  @JoinColumn()
  class_teacher: Teacher;

  @ManyToMany(() => Subject, { eager: true })
  @Field(() => [Subject])
  @JoinTable()
  subjects: Subject[];
}
