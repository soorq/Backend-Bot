import { CreateUserDto } from '@app/user/utils/dto';

export class CreateUserCommand {
  constructor(public readonly user: CreateUserDto) {}
}
