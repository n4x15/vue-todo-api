import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import User from 'src/shared/entities/user.entity'
import { Repository } from 'typeorm'
import { UserOutput } from '../dto/user.output'
import { hash } from 'bcrypt'
import { SignUpInput } from '../dto/sign-up.input'
import { Response } from 'express'

@Injectable()
export default class SignUpService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

  async process(input: SignUpInput, res: Response): Promise<void> {
    try {
      const { email, password } = input

      const user = await this.usersRepository.findOne({ where: { email } })

      if (user != null) throw new Error()

      const hashPass = await hash(password, 10)
      const nextUser = this.usersRepository.save({ ...input, password: hashPass })
      res.send({ user: JSON.stringify(nextUser) })
    } catch (e) {
      throw new Error(e)
    }
  }
}
