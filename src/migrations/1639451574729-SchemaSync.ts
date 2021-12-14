import {MigrationInterface, QueryRunner} from "typeorm";

export class SchemaSync1639451574729 implements MigrationInterface {
    name = 'SchemaSync1639451574729'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`nest\` CHANGE \`description\` \`description\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`payload\``);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`payload\` json NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`payload\``);
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`payload\` longtext COLLATE "utf8mb4_bin" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`nest\` CHANGE \`description\` \`description\` varchar(255) NULL DEFAULT 'NULL'`);
    }

}
