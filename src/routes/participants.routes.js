import { Router } from "express";
import { postParticipant } from "../controllers/participants.controller.js";
import {
  postStatus,
  postMessage,
  getMessages,
  getParticipants,
} from "../controllers/participants.controller.js";

const router = Router();

router.post("/participants", postParticipant);
router.post("/status", postStatus);
router.post("/messages", postMessage);
router.get("/messages", getMessages);
router.get("/participants", getParticipants);

export default router;
