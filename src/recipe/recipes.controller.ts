import { Response } from 'express'
import * as model from './recipes.model'
import { AuthRequest } from '../auth/auth.middleware'

export async function createRecipeHandler(req: AuthRequest, res: Response) {
  const userId = req.userId!
  const data = req.body
  const recipe = await model.createRecipe(userId, data)
  res.status(201).json({ recipeId: recipe.id })
}

export async function getRecipeHandler(req: AuthRequest, res: Response) {
  const id = req.params.id
  if (isNaN(Number(id))) {
    res.status(400).json({ error: 'Invalid id' })
    return
  }
  const recipe = await model.getRecipeById(Number(id))
  if (!recipe) return res.status(404).json({ error: 'not found' })
  res.json(recipe)
}

export async function updateRecipeHandler(req: AuthRequest, res: Response) {
  const userId = req.userId!
  const id = Number(req.params.id)
  const data = req.body
  const updated = await model.updateRecipe(userId, id, data)
  res.json(updated)
}

export async function deleteRecipeHandler(req: AuthRequest, res: Response) {
  const userId = req.userId!

  const id = Number(req.params.id)
  const result = await model.deleteRecipe(userId, id)
  if (!result.deleted) return res.status(404).json({ error: 'not found' })
  res.json({ success: true })
}

export async function listRecipesHandler(req: AuthRequest, res: Response) {
  const limit = Math.min(Number(req.query.limit ?? 50), 200)
  const offset = Number(req.query.offset ?? 0)

  const list = await model.listRecipes(limit, offset)
  res.json(list)
}
