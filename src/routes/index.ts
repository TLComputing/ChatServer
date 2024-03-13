import express from 'express';
import { login } from '../controllers/authController';
import { createUser } from '../controllers/userController';

const router = express.Router();

router.post('/users', createUser);
router.post('/login', login);


export default router;
