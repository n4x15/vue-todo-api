import { add } from 'date-fns'
import { Response } from 'express'

export const tokenSetter = (res: Response, key: string, token: string): void => {
  const date = add(new Date(), { days: 7 })

  res.cookie(key, token, {
    expires: date,
    path: '/',
    httpOnly: true
  })
}
