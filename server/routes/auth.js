import { Router } from 'express';
import { register, login, getMe} from '../controllers/auth';
import { verifyToken } from '../middleware/auth';

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/me", verifyToken, getMe);

export default router;