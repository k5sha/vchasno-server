import { Injectable } from '@nestjs/common';
import { CreateRoleInput } from './dto/create-role.input';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  async create(createRoleInput: CreateRoleInput): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { title: createRoleInput.title },
    });

    if (role) {
      throw new Error('Role already exists!');
    }

    const newRole = this.roleRepository.create(createRoleInput);

    return this.roleRepository.save(newRole);
  }
  findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  findOne(id: number): Promise<Role> {
    return this.roleRepository.findOne({
      where: { id },
    });
  }

  findOneByTitle(title: string) {
    return this.roleRepository.findOne({
      where: { title },
    });
  }

  remove(id: number): number {
    this.roleRepository.delete(id);
    return id;
  }
}
