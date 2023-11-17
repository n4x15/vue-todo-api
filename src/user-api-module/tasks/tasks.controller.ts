import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Res,
  UseGuards
} from '@nestjs/common'
import TasksCrudService from './services/tasks-crud.service'
import { CreateTaskInput } from './dto/create-task.input'
import { UpdateTaskInput } from './dto/update-task.input'
import { UpdateOrderInput } from './dto/update-order.input'
import { CurrentUser, CurrentUserContext } from 'src/decorators/current-user'
import { JwtAuthGuard } from 'src/guards/auth-guard'

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export default class TasksController {
  constructor(private readonly tasksCrudService: TasksCrudService) {}

  @Get()
  async getTasks(@CurrentUser() user: CurrentUserContext) {
    return this.tasksCrudService.findAll(user.id)
  }

  @Post()
  async createTask(@CurrentUser() user: CurrentUserContext, @Body('input') input: CreateTaskInput) {
    return this.tasksCrudService.createTask(input, user.id)
  }

  @Patch(':task_id')
  async updateTask(@Param('task_id') taskId: string, @Body('input') input: UpdateTaskInput) {
    return this.tasksCrudService.updateTask(input, taskId)
  }

  @Delete(':task_id')
  async deleteTask(@Param('task_id') taskId: string) {
    return this.tasksCrudService.deleteTask(taskId)
  }

  @Put('order')
  async updateTasksOrder(
    @CurrentUser() user: CurrentUserContext,
    @Body('input') input: UpdateOrderInput
  ) {
    return this.tasksCrudService.updateTasksOrder(input, user.id)
  }
}
