import { ObjectType, Field } from '@nestjs/graphql';
import { Subject } from 'src/subjects/entities/subject.entity';
import { User } from 'src/users/entities/user.entity';
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

  @OneToOne(() => User, { eager: true })
  @Field(() => User, { nullable: true })
  @JoinColumn()
  class_teacher: User;

  @ManyToMany(() => Subject, { eager: true })
  @Field(() => [Subject])
  @JoinTable()
  subjects: Subject[];
}
