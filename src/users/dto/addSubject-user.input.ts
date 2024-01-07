import { InputType, Field } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class AddSubjectInput {
  @IsNumber()
  @Field()
  teacherId: number;

  @IsNumber()
  @Field()
  subjectId: number;
}
