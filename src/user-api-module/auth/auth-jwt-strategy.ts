import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { ExtractJwt, Strategy } from 'passport-jwt'
import User from 'src/shared/entities/user.entity'
import { cookieExtractor } from 'src/shared/utils/cookie-extractor'
import { Repository } from 'typeorm'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'USER_PASSPORT_STRATEGY_NAME') {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET')
    })
  }

  async validate(payload): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id: payload.id } })
    if (user == null) throw new Error('Invalid payload')
    return user
  }
}
