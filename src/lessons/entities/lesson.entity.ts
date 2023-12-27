import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// TODO: theme entity
@Entity()
@ObjectType()
export class Lesson {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  title: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.lessons)
  @JoinTable()
  teacher: User;
}
