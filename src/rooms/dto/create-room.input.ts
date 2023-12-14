import { Field, InputType, Int } from '@nestjs/graphql';
import { IsAlpha } from 'class-validator';

@InputType()
export class CreateRoomInput {
  @IsAlpha()
  @Field()
  title: string;

  @Field({ nullable: true })
  type?: string;

  @Field(() => Int)
  ownerId: number;
}
