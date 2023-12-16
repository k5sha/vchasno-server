import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { RoomsService } from './rooms.service';
import { Room } from './room.entity';
import { CreateRoomInput } from './dto/create-room.input';
import { User } from 'src/users/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Resolver(() => Room)
export class RoomsResolver {
  constructor(private roomService: RoomsService) {}

  @Query(() => [Room])
  rooms(): Promise<Room[]> {
    return this.roomService.findAll();
  }

  @Query(() => Room)
  getRoom(@Args('id', { type: () => Int }) id: number): Promise<Room> {
    return this.roomService.findOne(id);
  }

  @ResolveField(() => User)
  owner(@Parent() room: Room): Promise<User> {
    return this.roomService.getOwner(room.id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Room)
  createRoom(
    @Args('createRoomInput') createRoomInput: CreateRoomInput,
  ): Promise<Room> {
    return this.roomService.createRoom(createRoomInput);
  }
}
