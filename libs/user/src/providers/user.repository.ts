import type { IUser, UserAggregate } from '@app/user/domain';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class UserRepository {
  abstract save(post: IUser): Promise<UserAggregate>;
  abstract findOne(id: string): Promise<UserAggregate | null>;
  abstract findOneByTg(tg_id: string): Promise<UserAggregate | null>;
  abstract findAll(): Promise<UserAggregate[] | []>;
  abstract findAllAdmins(): Promise<UserAggregate[] | []>;
  abstract delete(id: string): Promise<boolean>;
}
