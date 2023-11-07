import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'
import Task from 'src/shared/entities/task.entity'
import TasksController from './tasks.controller'
import TasksCrudService from './services/tasks-crud.service'

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [TasksCrudService]
})
export class TasksModule {}
