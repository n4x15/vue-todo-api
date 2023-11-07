import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common'
import SignInService from './services/sign-in.service'
import { SignInInput } from './dto/sing-in.input'
import { Response } from 'express'
import { SignUpInput } from './dto/sign-up.input'
import SignUpService from './services/sign-up.service'
import CurrentUserService from './services/current-user.service'

@Controller('auth')
export default class AuthController {
  constructor(
    private readonly signInService: SignInService,
    private readonly signUpService: SignUpService,
    private readonly currentUserService: CurrentUserService
  ) {}

  @Post('/sign-in')
  async signIn(@Body('input') input: SignInInput, @Res() res: Response): Promise<void> {
    return this.signInService.process(input, res)
  }

  @Post('/sign-up')
  async signup(@Body('input') input: SignUpInput, @Res() res: Response): Promise<void> {
    return this.signUpService.process(input, res)
  }

  @Get('/current-user/:id')
  async currentUser(@Param('id') id: string) {
    return this.currentUserService.process(id)
  }
}
