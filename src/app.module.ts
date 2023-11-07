import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import ormconfig from 'ormconfig'
import { ConfigModule } from '@nestjs/config'
import { UserApiModule } from './user-api-module/user-api.module'
import { TasksModule } from './user-api-module/tasks/tasks.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UserApiModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
