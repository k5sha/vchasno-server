// import { Field, Int, ObjectType } from '@nestjs/graphql';
// import { User } from 'src/users/entities/user.entity';
// import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

// @Entity()
// @ObjectType()
// export class Room {
//   @PrimaryGeneratedColumn()
//   @Field(() => Int)
//   id: number;

//   @Column()
//   @Field(() => String)
//   title: string;

//   @Column({ nullable: true })
//   @Field({ nullable: true })
//   type?: string;

//   @Column()
//   @Field(() => Int)
//   ownerId: number;

//   @ManyToOne(() => User, (user) => user.rooms)
//   @Field(() => User, { nullable: true })
//   owner: User;
// }
