import {Router} from "express";
import { getClientOrders, postClient } from "../controllers/clients.controller.js";


const router = Router();

router.post("/clients", postClient)
router.get("/clients/:id/orders", getClientOrders)


export default router;