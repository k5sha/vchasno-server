import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTeacherInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
