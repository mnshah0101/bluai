import express from 'express';
import { createProject, analyzeProject, returnSuggestions, getProjects, getFootprint, getProjectKey, deleteProject, deleteSuggestions, getUserSuggestions } from '../controllers/projectController.js';

const router = express.Router();

router.post('/', createProject);

router.post('/:projectId/analyze', analyzeProject);

router.get('/projects', getProjects);
router.get('/getSuggestions', getUserSuggestions);

router.post('/deleteProject', deleteProject)
router.post('/deleteSuggestions', deleteSuggestions);

router.get('/footprint/:projectId', getFootprint);

router.get('/key/:projectId', getProjectKey);

router.get('/suggestions/:projectId', returnSuggestions);


router.get('/', (req, res) => {
    res.send('Hello from project routes');
});

export default router;
