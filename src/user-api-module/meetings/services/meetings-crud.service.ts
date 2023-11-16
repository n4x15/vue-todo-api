import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import Meeting from 'src/shared/entities/meeting.entity'
import { Repository } from 'typeorm'
import { UpdateMeetingInput } from '../dto/update-meeting.input'

@Injectable()
export default class MeetingCrudService {
  constructor(
    @InjectRepository(Meeting) private readonly meetingsRepository: Repository<Meeting>
  ) {}

  async getCurrentMeeting(userId: string): Promise<Meeting> {
    const prevMonday = this.getPrevMonday()
    const date = new Date()

    const meetings = await this.meetingsRepository
      .createQueryBuilder('meetings')
      .andWhere('meetings.startsAt < :date', { date })
      .andWhere('meetings.userId = :userId', { userId })
      .orderBy('meetings.startsAt', 'DESC')
      .getMany()
    const meeting = meetings[0]
    if (meeting != null) return meeting

    const currentMeeting = await new Meeting({ userId, startsAt: prevMonday }).save()
    return currentMeeting
  }

  async getNextMeeting(userId: string): Promise<Meeting> {
    const date = new Date()
    const existed = await this.meetingsRepository
      .createQueryBuilder('meetings')
      .where('meetings.startsAt > :date', { date })
      .andWhere('meetings.userId = :userId', { userId })
      .getOne()

    if (existed != null) return existed

    const nextMonday = this.getNextMonday()

    const meeting = new Meeting({ userId, startsAt: nextMonday })
    await meeting.save()

    return meeting
  }

  async updateMeeting(input: UpdateMeetingInput, meetingId: string): Promise<void> {
    const date = new Date()
    const { startsAt: baseStartsAt } = input
    const startsAt = new Date(baseStartsAt)

    if (startsAt < date) return

    const lastMeeting = await this.meetingsRepository
      .createQueryBuilder('meetings')
      .where('meetings.id = :meetingId', { meetingId })
      .getOne()

    lastMeeting.startsAt = startsAt != null ? startsAt : lastMeeting.startsAt

    await lastMeeting.save()
  }

  async completeMeeting(meetingId: string): Promise<void> {
    const meeting = await this.meetingsRepository
      .createQueryBuilder('meetings')
      .where('meetings.id = :meetingId', { meetingId })
      .getOne()
    meeting.completedAt = new Date()
    await meeting.save()
  }

  private getNextMonday(): Date {
    const date = new Date()
    const nextMonday = new Date()

    if (date.getDay()) {
      nextMonday.setDate(date.getDate() + 8 - date.getDay())
    } else {
      nextMonday.setDate(date.getDate() + 1)
    }
    nextMonday.setHours(0, 0, 0, 0)
    return nextMonday
  }

  private getPrevMonday(): Date {
    var date = new Date()
    var day = date.getDay()
    var prevMonday = new Date()
    if (date.getDay() == 0) {
      prevMonday.setDate(date.getDate() - 7)
    } else {
      prevMonday.setDate(date.getDate() - (day - 1))
    }
    prevMonday.setHours(0, 0, 0, 0)
    return prevMonday
  }
}
