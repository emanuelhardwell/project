import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationUserProject1741313987419 implements MigrationInterface {
    name = 'RelationUserProject1741313987419'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_projects_access_level_enum" AS ENUM('30', '40', '50')`);
        await queryRunner.query(`CREATE TABLE "users_projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "access_level" "public"."users_projects_access_level_enum" NOT NULL, "user_id" uuid, "project_id" uuid, CONSTRAINT "PK_f3d2d1a584f1bbc6a91d7ea5773" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users_projects" ADD CONSTRAINT "FK_0f280c70a3a6ab7f4cf3c658c4c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_projects" ADD CONSTRAINT "FK_741210c246defe00ed877a98f2a" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_projects" DROP CONSTRAINT "FK_741210c246defe00ed877a98f2a"`);
        await queryRunner.query(`ALTER TABLE "users_projects" DROP CONSTRAINT "FK_0f280c70a3a6ab7f4cf3c658c4c"`);
        await queryRunner.query(`DROP TABLE "users_projects"`);
        await queryRunner.query(`DROP TYPE "public"."users_projects_access_level_enum"`);
    }

}
