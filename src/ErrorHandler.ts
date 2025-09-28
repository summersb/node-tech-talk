import { NextFunction, Response } from 'express'
import { NetworkError } from './types'
import { AuthRequest } from './auth/auth.middleware'

export const errorHandler = (err: unknown, req: AuthRequest, res: Response, _next: NextFunction) => {
  console.error('Error caught by middleware:', err)

  if (err instanceof NetworkError) {
    console.error('Handled Error:', {
      error: err.message,
      stack: err.stack,
      userId: req.userId,
    })
    return res.status(err.status || 500).json({ error: err.message || 'Server error' })
  }

  if (err instanceof Error) {
    console.error('Unknown Server Error:', {
      error: err.message,
      stack: err.stack,
      userId: req.userId,
    })
    return res.status(500).json({ error: 'An unexpected error occurred' })
  }

  console.error('Non-Error Value Thrown:', err)
  return res.status(500).json({ error: 'An unexpected error occurred' })
}
