import { ObjectType, Field } from '@nestjs/graphql';
import { Mark } from 'src/marks/entities/mark.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Student {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @OneToOne(() => User, (user) => user.student, { eager: true })
  @Field(() => User)
  user: User;

  @OneToMany(() => Mark, (mark) => mark.student)
  @Field(() => [Mark], { nullable: true })
  marks: Mark[];
}
