import {MigrationInterface, QueryRunner} from "typeorm";

export class NestRefactor1639448535116 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
        `ALTER TABLE "nest" RENAME COLUMN "name" TO "title"`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
        `ALTER TABLE "nest" RENAME COLUMN "title" TO "name"`,
        );
    }

    // await queryRunner.query(`ALTER TABLE \`coffee\` ADD \`description\` varchar(255) NULL`);
}
