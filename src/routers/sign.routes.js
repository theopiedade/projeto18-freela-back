import { Router } from "express"
import { signUp, signIn } from "../controllers/sign.controllers.js"
import { userSchema, signSchema } from "../schemas/user.schemas.js"
import { validateSchema } from "../middlewares/validateschema.js"

const signRouter = Router()

signRouter.post("/signup", validateSchema(userSchema), signUp)
signRouter.post("/signin", validateSchema(signSchema), signIn)

export default signRouter