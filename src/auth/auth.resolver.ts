import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { SignupUserInput } from './dto/signup-user.input';
import { SignUpResponse } from './dto/signup-response';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context,
  ): Promise<LoginResponse> {
    return this.authService.login(context.user);
  }

  @Mutation(() => SignUpResponse)
  signup(
    @Args('signupUserInput') signupUserInput: SignupUserInput,
  ): Promise<SignUpResponse> {
    return this.authService.signup(signupUserInput);
  }
}
