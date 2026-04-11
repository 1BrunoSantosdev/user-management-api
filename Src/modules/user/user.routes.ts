import { Router } from "express";
import { userController } from "./user.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/users", userController.create);
router.get("/users", userController.findAll);
router.get("/users/:id", userController.findById);

router.put("/users/:id", authMiddleware, userController.update);
router.delete("/users/:id", authMiddleware, userController.delete);
router.patch("/users/:id/password", authMiddleware, userController.updatePassword);

export { router as userRoutes };