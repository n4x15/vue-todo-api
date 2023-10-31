import * as dotenv from 'dotenv'
import * as path from 'path'

import { DataSourceOptions } from 'typeorm'

dotenv.config()

const dataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: true,
  logger: 'advanced-console'
}

export default {
  ...dataSourceConfig,
  migrations: [path.join(__dirname, '/src/db/migrations/*{.ts,.js}')],
  entities: [path.join(__dirname, '/src/**/*{.entity.ts, .entity.js}')],
  autoLoadEntities: true,
  cli: {
    migrationsDir: path.join(__dirname, '/src/db/migrations')
  }
}
