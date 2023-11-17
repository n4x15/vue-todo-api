import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import Meeting from 'src/shared/entities/meeting.entity'
import MeetingsController from './meetings.controller'
import MeetingCrudService from './services/meetings-crud.service'

@Module({
  imports: [TypeOrmModule.forFeature([Meeting])],
  controllers: [MeetingsController],
  providers: [MeetingCrudService],
  exports: [MeetingCrudService]
})
export class MeetingsModule {}
