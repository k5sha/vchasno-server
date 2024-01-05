import { Injectable } from '@nestjs/common';
import { Form } from './entities/form.entity';
import { CreateFormInput } from './dto/create-form.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FormsService {
  constructor(
    @InjectRepository(Form) private formRepository: Repository<Form>,
  ) {}

  async create(createFormInput: CreateFormInput): Promise<Form> {
    const form = await this.formRepository.findOne({
      where: { title: createFormInput.title },
    });

    if (form) {
      throw new Error('Form already exists!');
    }

    const newForm = this.formRepository.create(createFormInput);

    return this.formRepository.save(newForm);
  }
  findAll(): Promise<Form[]> {
    return this.formRepository.find();
  }

  findOne(id: number): Promise<Form> {
    return this.formRepository.findOne({
      where: { id },
    });
  }

  remove(id: number): number {
    this.formRepository.delete(id);
    return id;
  }
}
