import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SchoolsService } from './schools.service';
import { School } from './entities/school.entity';
import { CreateSchoolInput } from './dto/create-school.input';
import { AddTeacherToSchoolInput } from './dto/addTeacherToSchool.input';
import { AddStudentToSchoolInput } from './dto/addStudentToSchool.input';
import { AddFormToSchoolInput } from './dto/addFormToSchool.input';

@Resolver(() => School)
export class SchoolsResolver {
  constructor(private readonly schoolsService: SchoolsService) {}

  @Mutation(() => School)
  createSchool(
    @Args('createSchoolInput') createSchoolInput: CreateSchoolInput,
  ) {
    return this.schoolsService.create(createSchoolInput);
  }

  @Mutation(() => School)
  addFormToSchool(
    @Args('addFormToSchoolInput')
    addFormToSchoolInput: AddFormToSchoolInput,
  ) {
    return this.schoolsService.addFormToSchool(addFormToSchoolInput);
  }

  @Mutation(() => School)
  addTeacherToSchool(
    @Args('addTeacherToSchoolInput')
    addTeacherToSchoolInput: AddTeacherToSchoolInput,
  ) {
    return this.schoolsService.addTeacherToSchool(addTeacherToSchoolInput);
  }

  @Mutation(() => School)
  addStudentToSchool(
    @Args('addStudentToSchoolInput')
    addStudentToSchoolInput: AddStudentToSchoolInput,
  ) {
    return this.schoolsService.addStudentToSchool(addStudentToSchoolInput);
  }

  @Query(() => [School], { name: 'schools' })
  findAll() {
    return this.schoolsService.findAll();
  }

  @Query(() => School, { name: 'school' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.schoolsService.findOne(id);
  }

  @Mutation(() => Number)
  removeSchool(@Args('id', { type: () => Int }) id: number) {
    return this.schoolsService.remove(id);
  }
}
