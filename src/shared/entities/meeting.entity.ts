import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'meetings' })
export default class Meeting extends BaseEntity {
  constructor(
    params?: Partial<{
      startsAt: Date
      completedAt: Date
      userId: string
    }>
  ) {
    super()
    Object.assign(this, params)
  }

  @Column({ name: 'id' })
  @PrimaryGeneratedColumn()
  id: string

  @Column({ name: 'starts_at', type: 'time with time zone' })
  startsAt: Date | null

  @Column({ name: 'completed_at', type: 'time with time zone' })
  completedAt: Date | null

  @Column({ name: 'user_id' })
  userId: string
}
