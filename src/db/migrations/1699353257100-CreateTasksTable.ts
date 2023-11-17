import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm'

export class CreateTasksTable1699353257100 implements MigrationInterface {
  private readonly table = new Table({
    name: 'tasks',
    columns: [
      new TableColumn({ name: 'id', type: 'uuid', isPrimary: true, default: 'uuid_generate_v4()' }),
      new TableColumn({ name: 'text', type: 'varchar', isNullable: true }),
      new TableColumn({ name: 'user_id', type: 'uuid', isNullable: true }),
      new TableColumn({ name: 'is_completed', type: 'boolean', isNullable: false, default: false }),
      new TableColumn({
        name: 'created_at',
        type: 'timestamp with time zone',
        isNullable: false,
        default: 'now()'
      }),
      new TableColumn({
        name: 'updated_at',
        type: 'timestamp with time zone',
        isNullable: false,
        default: 'now()'
      })
    ]
  })

  private readonly foreignKey = new TableForeignKey({
    name: 'user_tasks_foreign_key',
    columnNames: ['user_id'],
    referencedTableName: 'users',
    referencedColumnNames: ['id'],
    onDelete: 'CASCADE'
  })

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table)
    await queryRunner.createForeignKey(this.table, this.foreignKey)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table)
  }
}
