import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import Task from 'src/shared/entities/task.entity'
import TasksController from './tasks.controller'
import TasksCrudService from './services/tasks-crud.service'
import { MeetingsModule } from '../meetings/meetings.module'

@Module({
  imports: [TypeOrmModule.forFeature([Task]), MeetingsModule],
  controllers: [TasksController],
  providers: [TasksCrudService]
})
export class TasksModule {}
