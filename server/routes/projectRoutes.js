import express from 'express';
import { createProject, analyzeProject, getProjectStats, getUserProjects, getFootprint, getProjectKey, deleteProject, deleteSuggestions, getUserSuggestions, getProjectSuggestions } from '../controllers/projectController.js';

const router = express.Router();

router.post('/', createProject);
router.post('/:projectId/analyze', analyzeProject);
router.post('/deleteProject', deleteProject)
router.post('/deleteSuggestions', deleteSuggestions);

router.get('/projects', getUserProjects);
router.get('/:projectId/projectSuggestions', getProjectSuggestions);
router.get('/userSuggestions', getUserSuggestions);
router.get(':projectId/footprint', getFootprint);
router.get(':projectId//key', getProjectKey);
router.get('/:projectId/projectStats', getProjectStats);


router.get('/', (req, res) => {
    res.send('Hello from project routes');
});

export default router;
