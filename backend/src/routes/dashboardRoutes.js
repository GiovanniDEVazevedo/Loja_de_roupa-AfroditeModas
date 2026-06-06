import { Router } from "express";
import DashboardController from "../controllers/DashboardController.js";
import admin from "../middlewares/admin.js";

const router = Router();

router.get("/", admin, DashboardController.index);

export default router
