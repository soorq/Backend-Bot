import { EnumRole } from '@app/entities/lib/enum';

export interface IUser {
  /** Идентификатор юзера */
  id: string;

  tg_id: string;

  role: EnumRole;

  /** Дата создания */
  createdAt: string;

  /** Дата обновления */
  updatedAt: string;
}
