import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInfo {
  @Field(() => String)
  first_name: string;

  @Field(() => String)
  second_name: string;

  @Field(() => String)
  patronymic: string;
}
