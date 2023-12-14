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
  @Mutation(() => Room)
  createRoom(
    @Args('createRoomInput') createRoomInput: CreateRoomInput,
  ): Promise<Room> {
    return this.roomService.createRoom(createRoomInput);
  }
}
