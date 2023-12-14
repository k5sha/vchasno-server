import { Injectable } from '@nestjs/common';
import { Room } from './room.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoomInput } from './dto/create-room.input';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room) private roomRepository: Repository<Room>,
    private usersService: UsersService,
  ) {}

  createRoom(createRoomInput: CreateRoomInput): Promise<Room> {
    const newRoom = this.roomRepository.create(createRoomInput);

    return this.roomRepository.save(newRoom);
  }

  findAll(): Promise<Room[]> {
    return this.roomRepository.find();
  }

  findOne(id: number): Promise<Room> {
    return this.roomRepository.findOne({
      where: { id },
    });
  }

  getOwner(ownerId: number): Promise<User> {
    return this.usersService.findOneById(ownerId);
  }
}
