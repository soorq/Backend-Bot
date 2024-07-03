import { IUser } from '@app/user/domain';

export type CreateUserDto = Omit<IUser, 'createdAt' | 'id' | 'updatedAt'>;
