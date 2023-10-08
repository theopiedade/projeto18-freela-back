import { Router } from "express"
import servicesRouter from "./services.routes.js"
import signRouter from "./sign.routes.js"

const router = Router()

router.use(signRouter)

export default router