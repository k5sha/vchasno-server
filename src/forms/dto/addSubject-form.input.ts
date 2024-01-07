import { InputType, Field } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class AddSubjectToFormInput {
  @IsNumber()
  @Field()
  formId: number;

  @IsNumber()
  @Field()
  subjectId: number;
}
