import { InputType, Field } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class DeleteClassTeacherFormInput {
  @IsNumber()
  @Field()
  formId: number;

  @IsNumber()
  @Field()
  teacherId: number;
}
