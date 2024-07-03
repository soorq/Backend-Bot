import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserCreateMigration1719872866015 implements MigrationInterface {
  name = 'UserCreateMigration1719872866015';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "created_at" varchar NOT NULL, "updated_at" varchar NOT NULL)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
