import { Router } from 'express';
import { login, loginWithPin } from '../controllers/auth.controllers';

const route = Router();

route.put('/login', login);
route.put('/pin', loginWithPin);

export default route;