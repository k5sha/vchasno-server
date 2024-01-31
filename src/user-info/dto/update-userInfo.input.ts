import { InputType, Field } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

@InputType()
export class UpdateUserInfo {
  @Field(() => String)
  first_name: string;

  @Field(() => String)
  second_name: string;

  @Field(() => String)
  patronymic: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  phone?: string;

  @Field(() => GraphQLUpload, { nullable: true })
  image?: Promise<FileUpload>;
}
