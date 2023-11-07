import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
  TableUnique
} from 'typeorm'

export class CreateSubTasksTable1699353606079 implements MigrationInterface {
  private readonly table = new Table({
    name: 'sub_tasks',
    columns: [
      new TableColumn({ name: 'id', type: 'uuid', isPrimary: true, default: 'uuid_generate_v4()' }),
      new TableColumn({ name: 'task_id', type: 'uuid', isNullable: true }),
      new TableColumn({ name: 'sub_task_id', type: 'uuid', isNullable: true })
    ]
  })

  private readonly taskForeignKey = new TableForeignKey({
    name: 'task_id_foreign_key',
    columnNames: ['task_id'],
    referencedTableName: 'tasks',
    referencedColumnNames: ['id'],
    onDelete: 'CASCADE'
  })

  private readonly subTaskForeignKey = new TableForeignKey({
    name: 'sub_task_id_foreign_key',
    columnNames: ['sub_task_id'],
    referencedTableName: 'tasks',
    referencedColumnNames: ['id'],
    onDelete: 'CASCADE'
  })

  private readonly uniqueConstraint = new TableUnique({
    name: 'sub_tasks_unique_constraint',
    columnNames: ['task_id', 'sub_task_id']
  })

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table)
    await queryRunner.createForeignKey(this.table, this.taskForeignKey)
    await queryRunner.createForeignKey(this.table, this.subTaskForeignKey)
    await queryRunner.createUniqueConstraint(this.table, this.uniqueConstraint)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table)
  }
}
