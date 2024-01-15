import { InputType, Field, Int } from '@nestjs/graphql';
import { IsDateString, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateLessonInput {
  @IsString()
  @Field()
  title: string;

  @IsNumber()
  @Field(() => Int)
  teacherId: number;

  @IsNumber()
  @Field(() => Int, { defaultValue: 0 })
  themeId?: number;

  @IsDateString()
  @Field(() => String)
  date: string;
}
