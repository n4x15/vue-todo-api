import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import Task from 'src/shared/entities/task.entity'
import { In, Repository } from 'typeorm'
import { CreateTaskInput } from '../dto/create-task.input'
import { UpdateTaskInput } from '../dto/update-task.input'
import MeetingCrudService from 'src/user-api-module/meetings/services/meetings-crud.service'
import { UpdateOrderInput } from '../dto/update-order.input'

@Injectable()
export default class TasksCrudService {
  constructor(
    @InjectRepository(Task) private readonly tasksRepository: Repository<Task>,
    private readonly meetingCrudService: MeetingCrudService
  ) {}

  async findAll(userId: string): Promise<Task[]> {
    const currentMeeting = await this.meetingCrudService.getCurrentMeeting(userId)
    const tasksQuery = this.tasksRepository
      .createQueryBuilder('tasks')
      .leftJoinAndSelect('tasks.subTasks', 'subTasks')
      .where('tasks.userId = :userId', { userId })
      .andWhere('tasks.id NOT IN (select sub_task_id from sub_tasks)')
      .orderBy('tasks.order', 'ASC')
      .addOrderBy('subTasks.order', 'ASC')

    if (currentMeeting != null && currentMeeting.completedAt != null)
      tasksQuery.andWhere(
        '(tasks.isCompleted = false OR (tasks.isCompleted = true AND tasks.completedAt > :completedDate))',
        { completedDate: currentMeeting.completedAt }
      )

    const tasks = await tasksQuery.getMany()

    return tasks ?? []
  }

  async createTask(input: CreateTaskInput, userId: string): Promise<Task> {
    const task = new Task({ ...input, userId, subTasks: [] })
    await task.save()

    return task
  }

  async updateTask(input: UpdateTaskInput, taskId: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id: taskId },
      relations: ['subTasks']
    })
    const normalizedInput = this.normalizeInput(input)

    const updatedTask = Object.assign(task, normalizedInput)

    const { subTaskIds, isCompleted } = normalizedInput

    if (isCompleted != null) {
      if (isCompleted) {
        updatedTask.completedAt = new Date()
      } else updatedTask.completedAt = null
    }

    if (subTaskIds != null) {
      const subTasks = await this.tasksRepository.find({ where: { id: In(subTaskIds) } })
      if (subTasks.length !== subTaskIds.length) throw new Error('incorrect sub tasks')
      updatedTask.subTasks = subTasks
    }
    await updatedTask.save()
    return updatedTask
  }

  private normalizeInput(input: UpdateTaskInput): UpdateTaskInput {
    const entries = Object.entries(input).filter((pair) => pair[1] !== undefined)
    return Object.fromEntries(entries)
  }

  async deleteTask(taskId: string): Promise<void> {
    const task = await this.tasksRepository.findOne({
      where: { id: taskId }
    })

    await task.remove()
    return
  }

  async updateTasksOrder(input: UpdateOrderInput, userId: string): Promise<void> {
    const { orders } = input
    const normalized = orders.reduce((memo, item) => {
      return { [item.id]: item.order, ...memo }
    }, {})
    const tasks = await this.tasksRepository.find({
      where: { id: In(Object.keys(normalized)), userId }
    })
    const updated = tasks.map((item) => ({ ...item, order: normalized[item.id] ?? 0 }))
    await this.tasksRepository.save(updated)
  }
}
