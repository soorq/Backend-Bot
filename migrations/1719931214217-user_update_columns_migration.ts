import { MigrationInterface, QueryRunner } from "typeorm";

export class UserUpdateColumnsMigration1719931214217 implements MigrationInterface {
    name = 'UserUpdateColumnsMigration1719931214217'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" varchar PRIMARY KEY NOT NULL, "created_at" varchar NOT NULL, "updated_at" varchar NOT NULL, "tg_id" varchar NOT NULL, "role" varchar CHECK( "role" IN ('admin','worker','user') ) NOT NULL DEFAULT ('user'))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "created_at", "updated_at") SELECT "id", "created_at", "updated_at" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "created_at" varchar NOT NULL, "updated_at" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "user"("id", "created_at", "updated_at") SELECT "id", "created_at", "updated_at" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
    }

}
