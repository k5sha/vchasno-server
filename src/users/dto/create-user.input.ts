import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  username: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  second_name: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  patronymic: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  password: string;

  @IsNotEmpty()
  @IsString()
  @Field({ defaultValue: 'STUDENT' })
  type?: 'STUDENT' | 'TEACHER';
}
