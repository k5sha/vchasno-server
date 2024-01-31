import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserInfo } from '../../user-info/entities/userInfo.entity';
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
  username: string;

  @Column()
  @Field()
  password: string;

  @OneToOne(() => UserInfo, { nullable: true, cascade: true })
  @Field(() => UserInfo, { nullable: true })
  @JoinColumn()
  userInfo: UserInfo;

  @OneToOne(() => Teacher, { nullable: true, cascade: true })
  @Field(() => Teacher, { nullable: true })
  @JoinColumn()
  teacher?: Teacher;

  @OneToOne(() => Student, { nullable: true, cascade: true })
  @Field(() => Student, { nullable: true })
  @JoinColumn()
  student?: Student;
}
