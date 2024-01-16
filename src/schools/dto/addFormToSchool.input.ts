import { InputType, Field } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class AddFormToSchoolInput {
  @IsNumber()
  @Field()
  formId: number;

  @IsNumber()
  @Field()
  schoolId: number;
}
