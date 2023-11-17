import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { TasksModule } from './tasks/tasks.module'
import { MeetingsModule } from './meetings/meetings.module'

@Module({
  imports: [AuthModule, TasksModule, MeetingsModule]
})
export class UserApiModule {}
