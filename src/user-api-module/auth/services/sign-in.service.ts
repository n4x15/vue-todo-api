import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import User from 'src/shared/entities/user.entity'
import { Repository } from 'typeorm'
import { SignInInput } from '../dto/sing-in.input'
import { compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { tokenSetter } from 'src/shared/utils/token-handler'
import { Response } from 'express'
import { UserOutput } from '../dto/user.output'

@Injectable()
export default class SignInService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async process(input: SignInInput, res: Response): Promise<User> {
    const { email, password } = input
    const user = await this.usersRepository.findOne({ where: { email } })

    if (user == null) throw new Error('User not found')
    if (!(await compare(password, user.password))) throw new Error('Incorrect password')

    const payload = { id: user.id, email: user.email }
    tokenSetter(res, 'token', this.jwtService.sign(payload))
    return user
  }
}
