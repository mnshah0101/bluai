import express from 'express';
import { createProject, analyzeProject, returnSuggestions, getProjects, getFootprint, getProjectKey, deleteProject } from '../controllers/projectController.js';

const router = express.Router();

router.post('/', createProject);

router.post('/:projectId/analyze', analyzeProject);

router.post('/projects', getProjects);

router.post('/deleteProject', deleteProject)
router.get('/footprint/:projectId', getFootprint);

router.get('/key/:projectId', getProjectKey);

router.get('/suggestions/:projectId', returnSuggestions);


router.get('/', (req, res) => {
    res.send('Hello from project routes');
});

export default router;
