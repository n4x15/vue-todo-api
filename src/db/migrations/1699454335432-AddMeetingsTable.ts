import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm'

export class AddMeetingsTable1699454335432 implements MigrationInterface {
  private readonly table = new Table({
    name: 'meetings',
    columns: [
      new TableColumn({ name: 'id', type: 'uuid', isPrimary: true, default: 'uuid_generate_v4()' }),
      new TableColumn({ name: 'starts_at', type: 'timestamp with time zone', isNullable: true }),
      new TableColumn({ name: 'completed_at', type: 'timestamp with time zone', isNullable: true }),
      new TableColumn({ name: 'user_id', type: 'uuid', isNullable: true })
    ]
  })

  private readonly foreignKey = new TableForeignKey({
    name: 'user_meetings_foreign_key',
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
