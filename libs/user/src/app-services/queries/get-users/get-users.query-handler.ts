import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserRepository } from '@app/user/providers';
import { UserAggregate } from '@app/user/domain';
import { GetUsersQuery } from './get-users.query';
import { Logger } from '@nestjs/common';

@QueryHandler(GetUsersQuery)
export class GetUsersQueryHandler
  implements IQueryHandler<GetUsersQuery, UserAggregate[] | []>
{
  private readonly logger = new Logger(GetUsersQueryHandler.name);

  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<UserAggregate[] | []> {
    const existUser = await this.userRepository.findAll().catch((err) => {
      this.logger.error(err);
      return [];
    });

    return existUser;
  }
}
