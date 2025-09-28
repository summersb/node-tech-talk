import { Request, Response, NextFunction } from 'express'
import { AuthRequest } from '../auth/auth.middleware'
import { NetworkError } from '../types'

// Define a type for your async controller functions for better type-safety
type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>

export const withErrorHandler = (handler: AsyncHandler) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next)
    } catch (err: unknown) {
      if (err instanceof NetworkError) {
        // Handle specific NetworkError cases
        console.error('Handled Error in Express Handler:', {
          error: err.message,
          stack: err.stack,
          // Extract relevant data from the request object for logging
          userId: req.userId,
          data: req.body,
        })
        res.status(err.status || 500).json({ error: err.message || 'Server error' })
      } else if (err instanceof Error) {
        // Handle other standard Error objects
        console.error('Unknown Error in Express Handler:', {
          error: err.message,
          stack: err.stack,
          // Extract relevant data from the request object for logging
          userId: req.userId,
          data: req.body,
        })
        res.status(500).json({ error: 'An unexpected error occurred' })
      } else {
        // Handle cases where non-Error values are thrown
        console.error('Non-Error value thrown:', err)
        res.status(500).json({ error: 'An unexpected error occurred' })
      }
    }
  }
}
