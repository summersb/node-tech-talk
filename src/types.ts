export interface IngredientInput {
  id?: number
  amount: string
  name: string
}

export interface InstructionInput {
  id?: number
  step_number: number
  text: string
}

export interface RecipeInput {
  id?: number
  title: string
  ingredients: IngredientInput[]
  instructions: InstructionInput[]
}

export class NetworkError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}
