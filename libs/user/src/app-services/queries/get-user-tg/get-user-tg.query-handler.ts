import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserRepository } from '@app/user/providers';
import { GetUserTgQuery} from './get-user-tg.query';
import { UserAggregate } from '@app/user/domain';
import { Logger } from '@nestjs/common';

@QueryHandler(GetUserTgQuery)
export class GetUserTgQueryHandler
  implements IQueryHandler<GetUserTgQuery, UserAggregate | null>
{
  private readonly logger = new Logger(GetUserTgQueryHandler.name);

  constructor(private readonly userRepository: UserRepository) {}

  async execute({ tg_id }: GetUserTgQuery): Promise<UserAggregate | null> {
    const existUser = await this.userRepository.findOneByTg(tg_id).catch((err) => {
      this.logger.error(err);
      return null as UserAggregate;
    });

    return existUser;
  }
}
