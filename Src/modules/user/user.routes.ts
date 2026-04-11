import { Router } from "express";
import { userController } from "./user.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";


const router = Router();

router.post("/", authMiddleware, userController.create);
router.get("/", authMiddleware, userController.findAll);
router.get("/:id", authMiddleware, userController.findById);
router.put("/:id", authMiddleware, userController.update);
router.delete("/:id", authMiddleware, userController.delete);
router.patch("/:id/password", authMiddleware, userController.updatePassword);

export { router as userRoutes };