import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import User from 'src/shared/entities/user.entity'
import { Repository } from 'typeorm'
import { hash } from 'bcrypt'
import { SignUpInput } from '../dto/sign-up.input'
import { Response } from 'express'
import { JwtService } from '@nestjs/jwt'
import { tokenSetter } from 'src/shared/utils/token-handler'

@Injectable()
export default class SignUpService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async process(input: SignUpInput, res: Response): Promise<User> {
    try {
      const { email, password } = input

      const user = await this.usersRepository.findOne({ where: { email } })

      if (user != null) throw new Error('User already exists')

      const hashPass = await hash(password, 10)
      const nextUser = await this.usersRepository.save({ ...input, password: hashPass })
      const payload = { id: nextUser.id, email: nextUser.email }
      tokenSetter(res, 'token', this.jwtService.sign(payload))

      return nextUser
    } catch (e) {
      throw e
    }
  }
}
