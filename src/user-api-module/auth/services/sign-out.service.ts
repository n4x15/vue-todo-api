import { Response } from 'express'
import { tokenSetter } from 'src/shared/utils/token-handler'

export default class SigOutService {
  async process(res: Response): Promise<void> {
    tokenSetter(res, 'token', '')
    return
  }
}
