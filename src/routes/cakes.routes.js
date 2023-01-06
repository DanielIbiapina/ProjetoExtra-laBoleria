import {Router} from "express";
import { postCake } from "../controllers/cakes.controller.js";

const router = Router();

router.post("/cakes", postCake)


export default router;
