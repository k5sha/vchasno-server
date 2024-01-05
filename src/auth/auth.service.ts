import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginResponse } from './dto/login-response';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { SignupUserInput } from './dto/signup-user.input';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Partial<User>> {
    const user = await this.usersService.findOneByUsername(username);

    if (!user) return null;

    const valid = await bcrypt.compare(password, user?.password);

    if (user && valid) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  private async createToken(user: User) {
    return await this.jwtService.sign({
      sub: user.id,
      username: user.username,
      roles: user.roles,
    });
  }

  async login(user: User): Promise<LoginResponse> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return {
      access_token: await this.createToken(user),
      user,
    };
  }

  async signup(signupUserInput: SignupUserInput) {
    const user = await this.usersService.findOneByUsername(
      signupUserInput.username,
    );

    if (user) {
      throw new Error('User already exists!');
    }

    const password = await bcrypt.hash(signupUserInput.password, 10);

    const createdUser = await this.usersService.create({
      ...signupUserInput,
      password,
    });

    return {
      access_token: await this.createToken(createdUser),
      user: createdUser,
    };
  }
}
