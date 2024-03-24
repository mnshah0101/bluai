import express from 'express';
import { createProject, analyzeProject } from '../controllers/projectController.js';

const router = express.Router();




router.post('/', createProject);
router.post('/:projectId/analyze', analyzeProject);
router.get('/', (req, res) => {
    res.send('Hello from project routes');
});

export default router;
