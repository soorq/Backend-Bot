import { UpdateUserDto } from '@app/user/utils/dto';

export class UpdateUserCommand {
  constructor(public readonly user: UpdateUserDto) {}
}
