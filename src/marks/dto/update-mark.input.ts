import { CreateMarkInput } from './create-mark.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMarkInput extends PartialType(CreateMarkInput) {
  @Field(() => Int)
  id: number;
}
