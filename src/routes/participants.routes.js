import { Router } from "express";
import { postParticipant } from "../controllers/participants.controller.js";
import {
  postStatus,
  postMessage,
  getMessages,
} from "../controllers/participants.controller.js";

const router = Router();

router.post("/participants", postParticipant);
router.post("/status", postStatus);
router.post("/messages", postMessage);
router.get("/messages", getMessages);

export default router;
