import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddFieldsToTasks1699454539110 implements MigrationInterface {
  private readonly columns = [
    new TableColumn({ name: 'order', type: 'int', isNullable: false, default: 0 }),
    new TableColumn({ name: 'completed_at', type: 'timestamp with time zone', isNullable: true })
  ]
  private readonly tableName = 'tasks'
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns(this.tableName, this.columns)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns(this.tableName, this.columns)
  }
}
