import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import Task from 'src/shared/entities/task.entity'
import { In, Repository } from 'typeorm'
import { CreateTaskInput } from '../dto/create-task.input'
import { UpdateTaskInput } from '../dto/update-task.input'

@Injectable()
export default class TasksCrudService {
  constructor(@InjectRepository(Task) private readonly tasksRepository: Repository<Task>) {}

  async findAll(userId: string) {
    const tasks = await this.tasksRepository.find({ where: { userId } })
    return tasks
  }

  async createTask(input: CreateTaskInput, userId: string) {
    console.log({ input })
    const task = new Task({ ...input, userId })
    await task.save()

    return task
  }

  async updateTask(input: UpdateTaskInput, userId: string, taskId: string) {
    const { text, isCompleted, subTaskIds } = input
    const task = await this.tasksRepository.findOne({
      where: { id: taskId },
      relations: ['subTasks']
    })
    task.text = text == null ? task.text : text
    task.isCompleted = isCompleted == null ? task.isCompleted : isCompleted

    if (subTaskIds != null) {
      const subTasks = await this.tasksRepository.find({ where: { id: In(subTaskIds) } })
      if (subTasks.length !== subTaskIds.length) throw new Error('incorrect sub tasks')
      task.subTasks = subTasks
    }

    await task.save()
    return task
  }
}
