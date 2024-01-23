import { InputType, Field } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

@InputType()
export class UpdateUserInfo {
  @Field(() => Number)
  id: number;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  phone?: string;

  @Field(() => GraphQLUpload, { nullable: true })
  image?: Promise<FileUpload>;
}
