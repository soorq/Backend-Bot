import { userFacadeFactory } from '@app/user/providers/user-facade.factory';
import { USER_COMMANDS_HANDLERS } from '@app/user/app-services/commands';
import { USER_QUERIES_HANDLERS } from '@app/user/app-services/queries';
import { CommandBus, CqrsModule, QueryBus } from '@nestjs/cqrs';
import { UserAdapter } from '@app/user/providers/user.adapter';
import { Module, OnModuleInit } from '@nestjs/common';
import { UserRepository } from '@app/user/providers';
import { UserFacade } from '@app/user/app-services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@app/entities';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [
    ...USER_COMMANDS_HANDLERS,
    ...USER_QUERIES_HANDLERS,
    {
      provide: UserFacade,
      inject: [CommandBus, QueryBus],
      useFactory: userFacadeFactory,
    },
    {
      provide: UserRepository,
      useClass: UserAdapter,
    },
  ],
  exports: [UserFacade],
})
export class UserModule implements OnModuleInit {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  onModuleInit() {
    this.commandBus.register(USER_COMMANDS_HANDLERS);
    this.queryBus.register(USER_QUERIES_HANDLERS);
  }
}
