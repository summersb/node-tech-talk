import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import * as authCtrl from './auth/auth.controller'
import { requireAuth } from './auth/auth.middleware'
import * as recipesCtrl from './recipe/recipes.controller'
import { errorHandler } from './ErrorHandler'
import { asyncHandler } from './AsyncHandler'

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Account routes
app.post('/auth/login', asyncHandler(authCtrl.login))

// Recipe routes
app.post('/recipe', requireAuth, asyncHandler(recipesCtrl.createRecipeHandler))
app.get('/recipes', requireAuth, asyncHandler(recipesCtrl.listRecipesHandler))
app.get('/recipe/:id', requireAuth, asyncHandler(recipesCtrl.getRecipeHandler))
app.put('/recipe/:id', requireAuth, asyncHandler(recipesCtrl.updateRecipeHandler))
app.delete('/recipe/:id', requireAuth, asyncHandler(recipesCtrl.deleteRecipeHandler))

app.use(errorHandler)
const port = Number(process.env.PORT ?? 3000)
app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on ${port}`)
})
