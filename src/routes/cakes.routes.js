import {Router} from "express";
import { postCake } from "../controllers/cakes.controller.js";
import { validateSchema } from "../middlewares/schema.validation.js";
import { cakesSchema } from "../schemas/cakes.schema.js";

const router = Router();

router.post("/cakes", validateSchema(cakesSchema), postCake)


export default router;
