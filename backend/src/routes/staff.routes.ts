import { Router } from 'express';
import { 
    getAllStaff, 
    createStaff, 
    updateStaff, 
    changeCredentials,
} from '../controllers/staff.controllers';
import { authenticate } from '../middleware/authenticate.middleware';
import { restrictTo } from '../middleware/restrictTo.middleware';

const route = Router();

route.get('/staff', authenticate, restrictTo(['ADMIN']), getAllStaff);
route.post('/staff', authenticate, restrictTo(['ADMIN']), createStaff);
route.patch('/staff/:id/credentials', authenticate, restrictTo(['ADMIN']), changeCredentials);
route.patch('/staff/:id', authenticate, restrictTo(['ADMIN']), updateStaff);

export default route;