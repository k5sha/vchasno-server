import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SubjectsService } from './subjects.service';
import { Subject } from './entities/subject.entity';
import { CreateSubjectInput } from './dto/create-subject.input';
import { UpdateSubjectInput } from './dto/update-subject.input';

@Resolver(() => Subject)
export class SubjectsResolver {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Mutation(() => Subject)
  createSubject(@Args('createSubjectInput') createSubjectInput: CreateSubjectInput) {
    return this.subjectsService.create(createSubjectInput);
  }

  @Query(() => [Subject], { name: 'subjects' })
  findAll() {
    return this.subjectsService.findAll();
  }

  @Query(() => Subject, { name: 'subject' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.subjectsService.findOne(id);
  }

  @Mutation(() => Subject)
  updateSubject(@Args('updateSubjectInput') updateSubjectInput: UpdateSubjectInput) {
    return this.subjectsService.update(updateSubjectInput.id, updateSubjectInput);
  }

  @Mutation(() => Subject)
  removeSubject(@Args('id', { type: () => Int }) id: number) {
    return this.subjectsService.remove(id);
  }
}
