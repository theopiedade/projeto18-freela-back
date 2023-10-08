import { Router } from "express"
import { signUp, signIn } from "../controllers/sign.controllers.js"
import { signUpSchema, signInSchema } from "../schemas/sign.schemas.js"
import { validateSchema } from "../middlewares/validateschema.js"

const signRouter = Router()

signRouter.post("/signup", validateSchema(signUpSchema), signUp)
signRouter.post("/signin", validateSchema(signInSchema), signIn)

export default signRouter