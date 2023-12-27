import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSubjectInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
