import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignupUserInput {
  @Field()
  username: string;

  @Field()
  first_name: string;

  @Field()
  second_name: string;

  @Field()
  patronymic: string;

  @Field()
  password: string;

  @Field({ defaultValue: 'STUDENT' })
  type?: 'STUDENT' | 'TEACHER';
}
