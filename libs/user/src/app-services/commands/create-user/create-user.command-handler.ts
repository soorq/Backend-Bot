import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { BadRequestException } from '@nestjs/common';
import { UserRepository } from '@app/user/providers';
import { UserAggregate } from '@app/user/domain';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand, UserAggregate>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ user }: CreateUserCommand): Promise<UserAggregate> {
    const userAggregate = UserAggregate.create(user);

    userAggregate.plainToInstance();

    const createUser = await this.userRepository
      .save(userAggregate)
      .catch((err) => {
        throw new BadRequestException(err);
      });

    return createUser;
  }
}
