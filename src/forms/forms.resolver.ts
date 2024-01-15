import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FormsService } from './forms.service';
import { Form } from './entities/form.entity';
import { CreateFormInput } from './dto/create-form.input';
import { SetClassTeacherFormInput } from './dto/setTeacher-form.input';
import { AddSubjectToFormInput } from './dto/addSubject-form.input';
import { DeleteClassTeacherFormInput } from './dto/deleteTeacher-form.input copy';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleAuthGuard } from 'src/auth/guards/role-auth.guard';

@Resolver(() => Form)
export class FormsResolver {
  constructor(private readonly formsService: FormsService) {}

  @Roles('TEACHER')
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
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
  setClassTeacher(
    @Args('setClassTeacherFormInput')
    setClassTeacherFormInput: SetClassTeacherFormInput,
  ) {
    return this.formsService.setClassTeacher(setClassTeacherFormInput);
  }

  @Mutation(() => Form)
  deleteClassTeacher(
    @Args('deleteClassTeacherFormInput')
    deleteClassTeacherFormInput: DeleteClassTeacherFormInput,
  ) {
    return this.formsService.deleteClassTeacher(deleteClassTeacherFormInput);
  }

  @Mutation(() => Form)
  addSubjectToForm(
    @Args('addSubjectToFormInput') addSubjectToFormInput: AddSubjectToFormInput,
  ) {
    return this.formsService.addSubjectToForm(addSubjectToFormInput);
  }

  @Mutation(() => Number)
  removeForm(@Args('id', { type: () => Int }) id: number) {
    return this.formsService.remove(id);
  }
}
