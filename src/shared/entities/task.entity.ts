import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import User from './user.entity'

@Entity({ name: 'tasks' })
export default class Task extends BaseEntity {
  constructor(
    params?: Partial<{
      text: string
      subTaskId: string
      userId: string
    }>
  ) {
    super()
    Object.assign(this, params)
  }
  @Column({ name: 'id' })
  @PrimaryGeneratedColumn()
  id: string

  @Column({ name: 'text' })
  text: string

  @Column({ name: 'is_completed' })
  isCompleted: boolean

  @ManyToMany(() => Task, { cascade: true })
  @JoinTable({
    name: 'sub_tasks',
    joinColumn: {
      name: 'task_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'sub_task_id',
      referencedColumnName: 'id'
    }
  })
  subTasks: Task[]

  @Column({ name: 'user_id', type: 'uuid', nullable: true })
  userId?: string | null

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: 'user_id' })
  user?: User | null

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
