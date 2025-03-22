import { Router } from "express";
import { PostController } from "../controllers";

const router = Router();

router.post("/", PostController.create);
router.put("/:id", PostController.update);
router.get("/:id", PostController.findById);
router.delete("/:id", PostController.delete);

export default router;