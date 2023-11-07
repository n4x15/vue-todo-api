import { Body, Controller, Get, Param, Patch, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import TasksCrudService from './services/tasks-crud.service'
import { CreateTaskInput } from './dto/create-task.input'
import { UpdateTaskInput } from './dto/update-task.input'

@Controller('tasks')
export default class TasksController {
  constructor(private readonly tasksCrudService: TasksCrudService) {}

  @Get(':user_id')
  async getTasks(@Param('user_id') userId: string) {
    return this.tasksCrudService.findAll(userId)
  }

  @Post(':user_id')
  async createTask(@Param('user_id') userId: string, @Body('input') input: CreateTaskInput) {
    return this.tasksCrudService.createTask(input, userId)
  }

  @Patch(':user_id/:task_id')
  async updateTask(
    @Param('user_id') userId: string,
    @Param('task_id') taskId: string,
    @Body('input') input: UpdateTaskInput
  ) {
    return this.tasksCrudService.updateTask(input, userId, taskId)
  }
}
