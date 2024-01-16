import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateSchoolInput {
  @IsString()
  @Field()
  title: string;
}
