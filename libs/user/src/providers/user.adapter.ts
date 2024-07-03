import type { DataSource, FindManyOptions, Repository } from 'typeorm';
import type { UserRepository } from './user.repository';
import { type IUser, UserAggregate } from '../domain';
import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { UserEntity } from '@app/entities';
import { EnumRole } from '@app/entities/lib/enum';

@Injectable()
export class UserAdapter implements UserRepository {
  private readonly logger = new Logger(UserAdapter.name);
  private readonly uModel: Repository<UserEntity>;

  constructor(
    @InjectDataSource()
    private readonly _ds: DataSource,
  ) {
    this.uModel = this._ds.getRepository(UserEntity);
  }

  save = async (user: IUser): Promise<UserAggregate> => {
    const t = this._ds.createQueryRunner();

    await t.connect();
    await t.startTransaction();

    try {
      const existUser = await this.findOne(user.id);
      if (existUser) {
        const { id, ...toUpdate } = user;
        await this.uModel.update({ id }, toUpdate);
        await t.commitTransaction();
        return this.findOne(user.id);
      }
      const savedUser = await this.uModel.save(user);
      await t.commitTransaction();
      return UserAggregate.create(savedUser);
    } catch (e) {
      await t.rollbackTransaction();
      throw new Error(String(e));
    }
  };

  findOne = async (id: string): Promise<UserAggregate> => {
    const existUser = await this.uModel.findOneBy({ id }).catch((err) => {
      this.logger.error(err);
      return null;
    });
    if (!existUser) {
      return null;
    }
    return UserAggregate.create(existUser);
  };

  findOneByTg = async (tg_id: string): Promise<UserAggregate> => {
    const existUser = await this.uModel.findOneBy({ tg_id }).catch((err) => {
      this.logger.error(err);
      return null;
    });
    if (!existUser) {
      return null;
    }
    return UserAggregate.create(existUser);
  };

  findAll = async (): Promise<UserAggregate[] | []> => {
    const options: FindManyOptions<UserEntity> = {
      order: {
        createdAt: 'DESC',
      },
    };

    const data = await this.uModel.find(options).catch((err) => {
      this.logger.error(err);
      return [] as UserEntity[];
    });
    return data.map((user) => UserAggregate.create(user));
  };

  findAllAdmins = async (): Promise<UserAggregate[] | []> => {
    const options: FindManyOptions<UserEntity> = {
      order: {
        createdAt: 'DESC',
      },
      where: { role: EnumRole.ADMIN },
    };

    const data = await this.uModel.find(options).catch((err) => {
      this.logger.error(err);
      return [] as UserEntity[];
    });

    return data.map((user) => UserAggregate.create(user));
  };

  delete = async (id: string): Promise<boolean> => {
    const t = this._ds.createQueryRunner();

    await t.connect();
    await t.startTransaction();

    const result = await this.uModel.delete({ id }).catch((err) => {
      this.logger.error(err);
      t.rollbackTransaction();
      return false;
    });

    await t.commitTransaction();

    return !!result;
  };
}
