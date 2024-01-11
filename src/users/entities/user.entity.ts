import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { userInfo } from './userInfo.entity';
import { Teacher } from '../../teachers/entities/teacher.entity';
import { Student } from '../../students/entities/student.entity';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  first_name: string;

  @Column()
  @Field()
  second_name: string;

  @Column()
  @Field()
  patronymic: string;

  @Column()
  @Field()
  username: string;

  @Column()
  @Field()
  password: string;

  @OneToOne(() => userInfo)
  @Field(() => userInfo, { nullable: true })
  userInfo: userInfo;

  @OneToOne(() => Teacher, { nullable: true, eager: true })
  @Field(() => Teacher, { nullable: true })
  @JoinColumn()
  teacher: Teacher;

  @OneToOne(() => Student, { nullable: true, eager: true })
  @Field(() => Student, { nullable: true })
  @JoinColumn()
  student: Student;
}
