import { Router } from 'express';
const router: Router = Router();
import userController from '../controllers/user.controller';
router.get('/', userController.getUsers);
export default router;
