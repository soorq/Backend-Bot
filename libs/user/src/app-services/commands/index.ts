import { CreateUserCommandHandler } from './create-user/create-user.command-handler';
import { UpdateUserCommandHandler } from './update-user/update-user.command-handler';
import { DeleteUserCommandHandler } from './delete-user/delete-user.command-handler';

// commands
export * from './create-user/create-user.command';
export * from './delete-user/delete-user.command';
export * from './update-user/update-user.command';

// comand-handlers
export * from './create-user/create-user.command-handler';
export * from './delete-user/delete-user.command-handler';
export * from './update-user/update-user.command-handler';

export const USER_COMMANDS_HANDLERS = [
  CreateUserCommandHandler,
  UpdateUserCommandHandler,
  DeleteUserCommandHandler,
];
