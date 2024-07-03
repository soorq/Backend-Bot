import { GetUserQuery } from '@app/user/app-services/queries/get-user/get-user.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserRepository } from '@app/user/providers';
import { UserAggregate } from '@app/user/domain';
import { Logger } from '@nestjs/common';

@QueryHandler(GetUserQuery)
export class GetUserQueryHandler
  implements IQueryHandler<GetUserQuery, UserAggregate | null>
{
  private readonly logger = new Logger(GetUserQueryHandler.name);

  constructor(private readonly postRepository: UserRepository) {}

  async execute({ id }: GetUserQuery): Promise<UserAggregate | null> {
    const existUser = await this.postRepository.findOne(id).catch((err) => {
      this.logger.error(err);
      return null as UserAggregate;
    });

    return existUser;
  }
}
