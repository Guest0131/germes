import { Router } from 'express';
import { register, login, getMe} from '../controllers/auth.js';
import { verifyToken } from '../middleware/auth.js';

const authRoute = Router();

authRoute.post("/login", login);
authRoute.post("/register", register);
authRoute.get("/me", verifyToken, getMe);

export default authRoute;