import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MarksService } from './marks.service';
import { Mark } from './entities/mark.entity';
import { CreateMarkInput } from './dto/create-mark.input';

@Resolver(() => Mark)
export class MarksResolver {
  constructor(private readonly marksService: MarksService) {}

  @Mutation(() => Mark)
  createMark(@Args('createMarkInput') createMarkInput: CreateMarkInput) {
    return this.marksService.create(createMarkInput);
  }

  @Query(() => [Mark], { name: 'marks' })
  findAll() {
    return this.marksService.findAll();
  }

  @Query(() => Mark, { name: 'mark' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.marksService.findOne(id);
  }

  @Mutation(() => Number)
  removeMark(@Args('id', { type: () => Int }) id: number) {
    return this.marksService.remove(id);
  }
}
