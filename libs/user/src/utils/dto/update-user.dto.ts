import type { IUser } from '@app/user/domain';

export type UpdateUserDto = Partial<IUser> & Pick<IUser, 'id'>;
