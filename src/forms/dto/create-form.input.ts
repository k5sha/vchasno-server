import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateFormInput {
  @IsString()
  @Field()
  title: string;
}
