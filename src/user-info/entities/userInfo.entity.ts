import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
@ObjectType()
export class UserInfo {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Field()
  @Column({ default: 'default-avatar.png' })
  image: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phone: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  email: string;

  @OneToOne(() => User, (user) => user.userInfo, { eager: true })
  @Field(() => User)
  user: User;
}
