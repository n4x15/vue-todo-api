import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddCommentFieldToTasks1699868059415 implements MigrationInterface {
  private readonly column = new TableColumn({ name: 'comment', isNullable: true, type: 'varchar' })
  private readonly tableName = 'tasks'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(this.tableName, this.column)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(this.tableName, this.column)
  }
}
