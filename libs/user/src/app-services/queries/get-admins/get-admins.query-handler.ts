import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserRepository } from '@app/user/providers';
import { GetAdminsQuery } from './get-admins.query';
import { UserAggregate } from '@app/user/domain';
import { Logger } from '@nestjs/common';

@QueryHandler(GetAdminsQuery)
export class GetAdminsQueryHandler
  implements IQueryHandler<GetAdminsQuery, UserAggregate[] | []>
{
  private readonly logger = new Logger(GetAdminsQueryHandler.name);

  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<UserAggregate[] | []> {
    const existUser = await this.userRepository.findAllAdmins().catch((err) => {
      this.logger.error(err);
      return [];
    });

    return existUser;
  }
}
