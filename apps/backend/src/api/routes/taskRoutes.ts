import { Router } from 'express';
import { createTaskHandler, listTasksHandler } from '../controllers/taskController';

const router = Router();

router.post('/tasks', createTaskHandler);
router.get('/tasks', listTasksHandler);

export default router;
