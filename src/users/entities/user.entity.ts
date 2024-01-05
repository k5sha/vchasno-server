import { ObjectType, Field } from '@nestjs/graphql';
import { Room } from 'src/rooms/room.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { userInfo } from './userInfo.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Lesson } from 'src/lessons/entities/lesson.entity';

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

  @ManyToMany(() => Role, { eager: true })
  @Field(() => [Role])
  @JoinTable()
  roles: Role[];

  @OneToMany(() => Room, (room) => room.owner, { eager: true })
  @Field(() => [Room], { nullable: true })
  rooms?: Room[];

  @OneToMany(() => Lesson, (lesson) => lesson.teacher, { eager: true })
  @Field(() => [Lesson], { nullable: true })
  lessons?: Lesson[];
}
