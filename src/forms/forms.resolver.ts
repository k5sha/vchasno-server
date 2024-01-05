import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FormsService } from './forms.service';
import { Form } from './entities/form.entity';
import { CreateFormInput } from './dto/create-form.input';

@Resolver(() => Form)
export class FormsResolver {
  constructor(private readonly formsService: FormsService) {}

  @Mutation(() => Form)
  createForm(@Args('createFormInput') createFormInput: CreateFormInput) {
    return this.formsService.create(createFormInput);
  }

  @Query(() => [Form], { name: 'forms' })
  findAll() {
    return this.formsService.findAll();
  }

  @Query(() => Form, { name: 'form' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.formsService.findOne(id);
  }

  @Mutation(() => Form)
  removeForm(@Args('id', { type: () => Int }) id: number) {
    return this.formsService.remove(id);
  }
}
