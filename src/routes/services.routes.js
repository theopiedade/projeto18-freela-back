import { Router } from "express"
import { getServices } from "../controllers/services.controllers.js"
import { signUpSchema, signInSchema } from "../schemas/sign.schemas.js"
import { validateSchema } from "../middlewares/validateschema.js"

const serviceRouter = Router()

serviceRouter.post("/getservices", getServices);
serviceRouter.post("/getmyservices", validateSchema(signInSchema), getMyServices);

export default signRouter