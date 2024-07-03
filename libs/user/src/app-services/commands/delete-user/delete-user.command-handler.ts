import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, Logger } from '@nestjs/common';
import { DeleteUserCommand } from './delete-user.command';
import { UserRepository } from '@app/user/providers';
import { UserAggregate } from '@app/user/domain';

@CommandHandler(DeleteUserCommand)
export class DeleteUserCommandHandler
  implements ICommandHandler<DeleteUserCommand, boolean>
{
  private readonly logger = new Logger(DeleteUserCommandHandler.name);

  constructor(private readonly userRepository: UserRepository) {}

  async execute({ id }: DeleteUserCommand): Promise<boolean> {
    const existUser = await this.userRepository.findOne(id).catch((err) => {
      this.logger.error(err);
      return null as UserAggregate;
    });

    if (!existUser) {
      throw new BadRequestException(`Post by id ${id} not found!`);
    }

    return await this.userRepository.delete(id).catch((err) => {
      throw new Error(err);
    });
  }
}
