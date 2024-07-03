import { PLAIN_TO_INSTANCE } from '@app/user/domain/services/plain-to-instance.case';
import { AggregateRoot } from '@nestjs/cqrs';

export class UserServices extends AggregateRoot {
  plainToInstance = PLAIN_TO_INSTANCE;
}
