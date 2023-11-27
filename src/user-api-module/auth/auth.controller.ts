import { Body, Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common'
import SignInService from './services/sign-in.service'
import { SignInInput } from './dto/sing-in.input'
import { Response } from 'express'
import { SignUpInput } from './dto/sign-up.input'
import SignUpService from './services/sign-up.service'
import CurrentUserService from './services/current-user.service'
import { CurrentUser, CurrentUserContext } from 'src/decorators/current-user'
import { JwtAuthGuard } from 'src/guards/auth-guard'
import SigOutService from './services/sign-out.service'
import User from 'src/shared/entities/user.entity'

@Controller('auth')
export default class AuthController {
  constructor(
    private readonly signInService: SignInService,
    private readonly signUpService: SignUpService,
    private readonly currentUserService: CurrentUserService,
    private readonly signOutService: SigOutService
  ) {}

  @Post('/sign-in')
  async signIn(
    @Body('input') input: SignInInput,
    @Res({ passthrough: true }) res: Response
  ): Promise<User> {
    return this.signInService.process(input, res)
  }

  @Post('/sign-up')
  async signup(
    @Body('input') input: SignUpInput,
    @Res({ passthrough: true }) res: Response
  ): Promise<User> {
    return this.signUpService.process(input, res)
  }

  @Post('/sign-out')
  async signOut(@Res({ passthrough: true }) res: Response): Promise<void> {
    return this.signOutService.process(res)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/current-user')
  async currentUser(@CurrentUser() user: CurrentUserContext): Promise<User> {
    return this.currentUserService.process(user.id)
  }
}
