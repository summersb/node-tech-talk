import { Request, Response } from 'express'
import { withTransaction } from '../db'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { PoolClient } from 'pg'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) throw new Error('JWT_SECRET not set')

export async function login(req: Request, res: Response) {
  return withTransaction(async (client: PoolClient) => {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ error: 'email and password required' })

    const result = await client.query(
      `SELECT id, password_hash
       FROM users
       WHERE email = $1`,
      [email],
    )
    const user = result.rows[0]
    if (!user) return res.status(401).json({ error: 'invalid credentials' })

    const match = await bcrypt.compare(password, user.password_hash)
    if (!match) return res.status(401).json({ error: 'invalid credentials' })

    const token = jwt.sign({ userId: user.id }, JWT_SECRET!, { expiresIn: '7d' })
    res.json({ token })
  })
}
