import { InputType, Field } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class AddStudentToSchoolInput {
  @IsNumber()
  @Field()
  studentId: number;

  @IsNumber()
  @Field()
  schoolId: number;
}
