import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateRoleInput {
  @IsString()
  @Field()
  title: string;
}
