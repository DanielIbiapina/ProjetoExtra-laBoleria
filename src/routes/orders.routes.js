import {Router} from "express";
import { getOrders, getOrdersById, postOrder } from "../controllers/orders.controller.js";


const router = Router();

router.post("/order", postOrder);
router.get("/orders", getOrders);
router.get("/orders/:id", getOrdersById);


export default router;