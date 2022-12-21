import { Router } from 'express';
import { register, login } from '../controllers/auth';

const router = Router();

router.post("/login", login)