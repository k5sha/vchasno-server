import { ObjectType, Field } from '@nestjs/graphql';
import {
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { Subject } from 'src/subjects/entities/subject.entity';
import { Theme } from 'src/themes/entities/theme.entity';
import { User } from 'src/users/entities/user.entity';
import { School } from 'src/schools/entities/school.entity';

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
  @Field(() => [Subject], { nullable: true })
  @JoinTable()
  subjects?: Subject[];

  @OneToOne(() => User, (user) => user.teacher, { eager: true })
  @Field(() => User)
  user: User;

  @ManyToOne(() => School, (school) => school.teachers)
  @Field(() => School)
  school: School;
}
