import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import MeetingCrudService from './services/meetings-crud.service'
import { UpdateMeetingInput } from './dto/update-meeting.input'
import { CurrentUser, CurrentUserContext } from 'src/decorators/current-user'
import { JwtAuthGuard } from 'src/guards/auth-guard'
@UseGuards(JwtAuthGuard)
@Controller('meetings')
export default class MeetingsController {
  constructor(private readonly meetingCrudService: MeetingCrudService) {}

  @Get()
  async getCurrentMeeting(@CurrentUser() user: CurrentUserContext) {
    return this.meetingCrudService.getCurrentMeeting(user.id)
  }

  @Get('/next')
  async getNextMeeting(@CurrentUser() user: CurrentUserContext) {
    return this.meetingCrudService.getNextMeeting(user.id)
  }

  @Patch(':meeting_id')
  async updateMeeting(
    @Param('meeting_id') meetingId: string,
    @Body('input') input: UpdateMeetingInput
  ) {
    return this.meetingCrudService.updateMeeting(input, meetingId)
  }

  @Post(':meeting_id') async completeMeeting(@Param('meeting_id') meetingId: string) {
    return this.meetingCrudService.completeMeeting(meetingId)
  }
}
