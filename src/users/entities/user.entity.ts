import { ObjectType, Field } from '@nestjs/graphql';
import { Room } from 'src/rooms/room.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany(() => Room, (room) => room.owner)
  @Field(() => [Room], { nullable: true })
  rooms?: Room[];
}
