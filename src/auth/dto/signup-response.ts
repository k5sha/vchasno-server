import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class SignUpResponse {
  @Field()
  access_token: string;

  @Field(() => User)
  user: Partial<User>;
}
