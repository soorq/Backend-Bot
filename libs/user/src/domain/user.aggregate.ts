import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { IsString, validateSync } from 'class-validator';
import { UserServices } from '@app/user/domain/services';
import { IUser } from '@app/user/domain/user.interface';
import { EnumRole } from '@app/entities/lib/enum';
import { DomainError } from '@app/errors';

export class UserAggregate extends UserServices implements IUser {
  @IsString()
  id: string = randomStringGenerator();

  @IsString()
  tg_id: string;

  @IsString()
  role: EnumRole = EnumRole.USER;

  @IsString()
  createdAt = new Date().toISOString();

  @IsString()
  updatedAt = new Date().toISOString();

  private constructor() {
    super();
  }

  static create(user: Partial<IUser>) {
    const _user = new UserAggregate();
    Object.assign(_user, user);
    _user.updatedAt = user?.id ? new Date().toISOString() : _user.updatedAt;
    const errors = validateSync(_user);
    if (!!errors.length) {
      throw new DomainError(errors, 'User not valid');
    }
    return _user;
  }
}
