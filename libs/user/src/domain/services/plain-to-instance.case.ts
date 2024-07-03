import { validateSync } from 'class-validator';
import type { IUser } from '@app/user/domain';

export const PLAIN_TO_INSTANCE = async function (this: IUser) {
  validateSync(this, { whitelist: true });
};
