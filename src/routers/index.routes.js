import { Router } from "express"
import servicesRouter from "./services.routes.js"
import usersRouter from "./users.routes.js"

const router = Router()

router.use(servicesRouter)
router.use(usersRouter)

export default router