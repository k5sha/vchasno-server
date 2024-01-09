import { InputType, Field } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateThemeInput {
  @IsString()
  @Field()
  title: string;

  @IsNumber()
  @Field()
  subjectId: number;

  @IsNumber()
  @Field()
  formId: number;

  @IsNumber()
  @Field()
  teacherId: number;
}
