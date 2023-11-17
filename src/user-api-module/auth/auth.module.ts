import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import User from 'src/shared/entities/user.entity'
import AuthController from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { ConfigService } from '@nestjs/config'
import { JwtStrategy } from './auth-jwt-strategy'
import SignInService from './services/sign-in.service'
import SignUpService from './services/sign-up.service'
import CurrentUserService from './services/current-user.service'
import SigOutService from './services/sign-out.service'

const configService = new ConfigService()

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: configService.get('JWT_SECRET'),
      signOptions: { expiresIn: '7 days' }
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthController,
    JwtStrategy,
    SignInService,
    SignUpService,
    CurrentUserService,
    SigOutService
  ]
})
export class AuthModule {}
