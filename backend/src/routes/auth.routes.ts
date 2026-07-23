import { Router } from 'express';
import { login, loginWithPin, getMe, logout } from '../controllers/auth.controllers';
import { protect } from '../middleware/protect.middleware';

const route = Router();

route.post('/login', login);
route.post('/pin', loginWithPin);
route.get('/me', protect, getMe);
route.post('/logout', protect, logout);

export default route;