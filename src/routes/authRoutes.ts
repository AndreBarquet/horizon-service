import { Router } from "express";

// Controllers
import { authLogin } from "@/api/controllers/authController";

const authRouter = Router();

authRouter.post("/login", authLogin);

export default authRouter;

