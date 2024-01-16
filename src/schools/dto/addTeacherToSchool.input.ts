import { InputType, Field } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class AddTeacherToSchoolInput {
  @IsNumber()
  @Field()
  teacherId: number;

  @IsNumber()
  @Field()
  schoolId: number;
}
