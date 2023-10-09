import { Router } from "express"
import { getServices, getMyServices, createServices  } from "../controllers/services.controllers.js"
import { servicesSchema } from "../schemas/services.schema.js"
import { validateSchema } from "../middlewares/validateschema.js"


const serviceRouter = Router()

serviceRouter.get("/getservices", getServices);
serviceRouter.get("/getmyservices/:id", getMyServices);
serviceRouter.post("/createservices/:id", validateSchema(servicesSchema), createServices);

export default serviceRouter