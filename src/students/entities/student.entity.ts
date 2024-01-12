import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Student {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @OneToOne(() => User, (user) => user.student, { eager: true })
  @Field(() => User)
  user: User;
}
