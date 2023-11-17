import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export type CurrentUserContext = {
  id: string
}

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): CurrentUserContext => {
    const request = ctx.switchToHttp().getRequest()
    return request.user
  }
)
