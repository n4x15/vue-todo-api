import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import User from 'src/shared/entities/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export default class CurrentUserService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

  async process(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } })
    if (user == null) return null

    return user
  }
}
