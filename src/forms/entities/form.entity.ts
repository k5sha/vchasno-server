import { ObjectType, Field } from '@nestjs/graphql';
import { Subject } from 'src/subjects/entities/subject.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
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

  @Field()
  @OneToOne(() => User)
  @Field(() => User)
  class_teacher: User;

  @Field(() => [Subject])
  @ManyToMany(() => Subject)
  @JoinTable()
  subjects: Subject[];
}
