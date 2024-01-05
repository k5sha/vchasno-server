import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateSubjectInput {
  @IsString()
  @Field()
  title: string;
}
