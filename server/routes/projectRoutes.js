import express from 'express';
import { createProject, analyzeProject, returnSuggestions, getProjects, getFootprint, getProjectKey, deleteProject } from '../controllers/projectController.js';

const router = express.Router();

// Route for creating a new project
router.post('/projects', createProject);

// Route for analyzing an existing project
router.post('/projects/:projectId/analyze', analyzeProject);

router.post('/', createProject);

router.post('/:projectId/analyze', analyzeProject);

router.post('/projects', getProjects);

router.post('/deleteProject', deleteProject);

router.get('/footprint/:projectId', getFootprint);

router.get('/key/:projectId', getProjectKey);

router.get('/suggestions/:projectId', returnSuggestions);


router.get('/', (req, res) => {
    res.send('Hello from project routes');
});

//Route to make openai call
router.post('/projects/makeGPTCall', makeGPTCall);

export default router;