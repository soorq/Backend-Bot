import { DataSource, type DataSourceOptions } from 'typeorm';
import { ENTITIES } from "@app/entities";
import { join } from 'path';

const options = (): DataSourceOptions => {
  return {
    database: 'db.sqlite',
    type: 'sqlite',
    logging: true,
    entities: ENTITIES,
    migrations: [join(process.cwd(), 'migrations', 'js', '*migration.js')],
    migrationsRun: true,
    migrationsTableName: 'migrations',
  };
};

export const appDataSource = new DataSource(options());
