import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import Task from './task.entity'

@Entity({ name: 'users' })
export default class User extends BaseEntity {
  constructor(
    params?: Partial<{
      firstName: string
      lastName: string
      email: string
      password: string
    }>
  ) {
    super()
    Object.assign(this, params)
  }

  @Column({ name: 'id' })
  @PrimaryGeneratedColumn()
  id: string

  @Column({ name: 'first_name' })
  firstName: string

  @Column({ name: 'last_name' })
  lastName: string

  @Column({ name: 'email' })
  email: string

  @Column({ name: 'password' })
  password: string

  @OneToMany(() => Task, (task) => task.user, {
    cascade: true
  })
  tasks: Task[]


  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
