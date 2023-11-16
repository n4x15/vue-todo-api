import { parse } from 'cookie'
import { Request } from 'express'

function getToken(cookieString: unknown): string | null {
  const cookieObject = parse(typeof cookieString === 'string' ? cookieString : '')
  return cookieObject?.token ?? null
}

export function cookieExtractor(req: Request): string | null {
  if (req.headers.cookie != null) {
    return getToken(req.headers.cookie)
  }
  return null
}
