import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm'

export class CreateUsersTable1698746098345 implements MigrationInterface {
  private readonly table = new Table({
    name: 'users',
    columns: [
      new TableColumn({
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        default: 'uuid_generate_v4()'
      }),
      new TableColumn({ name: 'first_name', type: 'text', isNullable: true }),
      new TableColumn({ name: 'last_name', type: 'text', isNullable: true }),
      new TableColumn({ name: 'email', type: 'text', isNullable: true }),
      new TableColumn({ name: 'password', type: 'text', isNullable: true }),
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

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table)
  }
}
