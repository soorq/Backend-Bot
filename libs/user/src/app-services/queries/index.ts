import { GetUserTgQueryHandler } from './get-user-tg/get-user-tg.query-handler';
import { GetAdminsQueryHandler } from './get-admins/get-admins.query-handler';
import { GetUsersQueryHandler } from './get-users/get-users.query-handler';
import { GetUserQueryHandler } from './get-user/get-user.query-handler';

// queries
export * from './get-user/get-user.query';
export * from './get-users/get-users.query';
export * from './get-admins/get-admins.query';
export * from './get-user-tg/get-user-tg.query';

// query-handlers
export * from './get-user/get-user.query-handler';
export * from './get-users/get-users.query-handler';
export * from './get-admins/get-admins.query-handler';
export * from './get-user-tg/get-user-tg.query-handler';

export const USER_QUERIES_HANDLERS = [
  GetUserQueryHandler,
  GetUsersQueryHandler,
  GetUserTgQueryHandler,
  GetAdminsQueryHandler,
];
