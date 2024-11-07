import express from "express";
import { handleNewUser } from "../controllers/register.controller";

const router = express.Router();

router.post("/", handleNewUser);

export default router;
