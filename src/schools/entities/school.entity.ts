import { ObjectType, Field } from '@nestjs/graphql';
import { Form } from 'src/forms/entities/form.entity';
import { Student } from 'src/students/entities/student.entity';
import { Teacher } from 'src/teachers/entities/teacher.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class School {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  title: string;

  @OneToMany(() => Student, (student) => student.school, { eager: true })
  @Field(() => [Student], { nullable: true })
  students: Student[];

  @OneToMany(() => Teacher, (teacher) => teacher.school, { eager: true })
  @Field(() => [Teacher], { nullable: true })
  teachers: Teacher[];

  @OneToMany(() => Form, (form) => form.school, { eager: true })
  @Field(() => [Form], { nullable: true })
  forms: Form[];
}
