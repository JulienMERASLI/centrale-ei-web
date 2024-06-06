import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class  $npmConfigName1717664584939 {
    name = ' $npmConfigName1717664584939'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "temporary_movie_user" (
                "movie_id" integer NOT NULL,
                "user_id" integer NOT NULL,
                "note" integer NOT NULL,
                "userId" integer,
                PRIMARY KEY ("movie_id", "user_id")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_movie_user"("movie_id", "user_id", "note", "userId")
            SELECT "movie_id",
                "user_id",
                "note",
                "userId"
            FROM "movie_user"
        `);
        await queryRunner.query(`
            DROP TABLE "movie_user"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_movie_user"
                RENAME TO "movie_user"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_movie_user" (
                "movie_id" integer NOT NULL,
                "user_id" integer NOT NULL,
                "note" integer NOT NULL,
                PRIMARY KEY ("movie_id", "user_id")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_movie_user"("movie_id", "user_id", "note")
            SELECT "movie_id",
                "user_id",
                "note"
            FROM "movie_user"
        `);
        await queryRunner.query(`
            DROP TABLE "movie_user"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_movie_user"
                RENAME TO "movie_user"
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie_user"
                RENAME TO "temporary_movie_user"
        `);
        await queryRunner.query(`
            CREATE TABLE "movie_user" (
                "movie_id" integer NOT NULL,
                "user_id" integer NOT NULL,
                "note" integer NOT NULL,
                "userId" integer,
                PRIMARY KEY ("movie_id", "user_id")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "movie_user"("movie_id", "user_id", "note")
            SELECT "movie_id",
                "user_id",
                "note"
            FROM "temporary_movie_user"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_movie_user"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie_user"
                RENAME TO "temporary_movie_user"
        `);
        await queryRunner.query(`
            CREATE TABLE "movie_user" (
                "movie_id" integer NOT NULL,
                "user_id" integer NOT NULL,
                "note" integer NOT NULL,
                "userId" integer,
                CONSTRAINT "FK_78c4c379746cc5047efcb47a74f" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION,
                PRIMARY KEY ("movie_id", "user_id")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "movie_user"("movie_id", "user_id", "note", "userId")
            SELECT "movie_id",
                "user_id",
                "note",
                "userId"
            FROM "temporary_movie_user"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_movie_user"
        `);
    }
}
