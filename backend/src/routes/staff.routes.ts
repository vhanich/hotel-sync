import { Router } from 'express';
import { 
    getAllStaff, 
    createStaff, 
    updateStaff, 
    deleteStaff 
} from '../controllers/staff.controllers';
import { authenticate } from '../middleware/authenticate';
import { restrictTo } from '../middleware/restrictTo';

const route = Router();

route.get('/staff', authenticate, restrictTo(['ADMIN']), getAllStaff);
route.post('/staff', authenticate, restrictTo(['ADMIN']), createStaff);
route.put('/staff/:id', authenticate, restrictTo(['ADMIN']), updateStaff);
route.delete('/staff/:id', authenticate, restrictTo(['ADMIN']), deleteStaff);

export default route;