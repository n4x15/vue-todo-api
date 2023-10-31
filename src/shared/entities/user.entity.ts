import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
