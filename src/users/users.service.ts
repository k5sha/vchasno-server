import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private rolesService: RolesService,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const role = await this.rolesService.findOneByTitle('STUDENT');

    if (!role) {
      throw new Error('Role not exsist');
    }

    const newUser = this.userRepository.create(createUserInput);
    newUser.roles = [role];
    return this.userRepository.save(newUser);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOneById(id: number) {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  findOneByUsername(username: string) {
    return this.userRepository.findOne({
      where: { username },
    });
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return this.userRepository.update(id, updateUserInput);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
