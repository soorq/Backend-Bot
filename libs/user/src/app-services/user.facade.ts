import type { CreateUserDto, UpdateUserDto } from '@app/user/utils/dto';
import type { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import {
  GetAdminsQuery,
  GetAdminsQueryHandler,
  GetUserQuery,
  GetUserQueryHandler,
  GetUsersQuery,
  GetUsersQueryHandler,
  GetUserTgQuery,
  GetUserTgQueryHandler,
} from '@app/user/app-services/queries';
import {
  CreateUserCommand,
  CreateUserCommandHandler,
  DeleteUserCommand,
  DeleteUserCommandHandler,
  UpdateUserCommand,
  UpdateUserCommandHandler,
} from '@app/user/app-services/commands';

@Injectable()
export class UserFacade {
  constructor(
    private readonly command: CommandBus,
    private readonly query: QueryBus,
  ) {}

  commands = {
    createUser: (user: CreateUserDto) => this.createUser(user),
    updateUser: (user: UpdateUserDto) => this.updateUser(user),
    deleteUser: (id: string) => this.deleteUser(id),
  };

  queries = {
    getOneUserByTg: (tg_id: string) => this.getUserByTg(tg_id),
    getOneUser: (id: string) => this.getUser(id),
    getAllAdmins: () => this.getAdmins(),
    getAllUsers: () => this.getUsers(),
  };

  private createUser(user: CreateUserDto) {
    return this.command.execute<
      CreateUserCommand,
      Awaited<ReturnType<CreateUserCommandHandler['execute']>>
    >(new CreateUserCommand(user));
  }

  private updateUser(user: UpdateUserDto) {
    return this.command.execute<
      UpdateUserCommand,
      Awaited<ReturnType<UpdateUserCommandHandler['execute']>>
    >(new UpdateUserCommand(user));
  }

  private deleteUser(id: string) {
    return this.command.execute<
      DeleteUserCommand,
      Awaited<ReturnType<DeleteUserCommandHandler['execute']>>
    >(new DeleteUserCommand(id));
  }

  private getUser(id: string) {
    return this.query.execute<
      GetUserQuery,
      Awaited<ReturnType<GetUserQueryHandler['execute']>>
    >(new GetUserQuery(id));
  }

  private getUserByTg(tg_id: string) {
    return this.query.execute<
      GetUserTgQuery,
      Awaited<ReturnType<GetUserTgQueryHandler['execute']>>
    >(new GetUserTgQuery(tg_id));
  }

  private getUsers() {
    return this.query.execute<
      GetUsersQuery,
      Awaited<ReturnType<GetUsersQueryHandler['execute']>>
    >(new GetUsersQuery());
  }

  private getAdmins() {
    return this.query.execute<
      GetAdminsQuery,
      Awaited<ReturnType<GetAdminsQueryHandler['execute']>>
    >(new GetAdminsQuery());
  }
}
