import { InputType, Field } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class CreateMarkInput {
  @IsNumber()
  @Field()
  mark: number;

  @IsNumber()
  @Field()
  formId: number;

  @IsNumber()
  @Field()
  lessonId: number;

  @IsNumber()
  @Field()
  subjectId: number;

  @IsNumber()
  @Field()
  studentId: number;

  @IsNumber()
  @Field()
  teacherId: number;
}
