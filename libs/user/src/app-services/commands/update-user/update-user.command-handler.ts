import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, Logger } from '@nestjs/common';
import { UpdateUserCommand } from './update-user.command';
import { UserRepository } from '@app/user/providers';
import { UserAggregate } from '@app/user/domain';

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler
  implements ICommandHandler<UpdateUserCommand, UserAggregate>
{
  private readonly logger = new Logger(UpdateUserCommandHandler.name);

  constructor(private readonly userRepository: UserRepository) {}

  async execute({ user }: UpdateUserCommand): Promise<UserAggregate> {
    const existUser = await this.userRepository
      .findOne(user.id)
      .catch((err) => {
        this.logger.error(err);
        return null as UserAggregate;
      });
    if (!existUser) {
      throw new BadRequestException(`User by id ${user.id} not found!`);
    }
    Object.assign(existUser, user);
    const postAggregate = UserAggregate.create(existUser);
    postAggregate.plainToInstance();
    await this.userRepository.save(postAggregate);
    return postAggregate;
  }
}
