import type { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserFacade } from '../app-services';

export const userFacadeFactory = (commandBus: CommandBus, queryBus: QueryBus) =>
  new UserFacade(commandBus, queryBus);
