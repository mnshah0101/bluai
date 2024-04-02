import express from 'express';
import { getFootprint, getProject, createProject, analyzeProject, getProjectStats, getUserProjects, getProjectKey, deleteProject, deleteSuggestions, getUserSuggestions, getProjectSuggestions } from '../controllers/projectController.js';

const router = express.Router();

router.post('/', createProject);
router.post('/analyze', analyzeProject);
router.post('/deleteProject', deleteProject)
router.post('/deleteSuggestions', deleteSuggestions);

router.get('/projects/:propel_user_id', getUserProjects);
router.get('/:projectId/projectSuggestions', getProjectSuggestions);
router.get('/userSuggestions/:propel_user_id', getUserSuggestions);
router.get('/footprint/:projectId', getFootprint);
router.get(':projectId//key', getProjectKey);
router.get('/:projectId/projectStats', getProjectStats);
router.get('/getProject/:projectId', getProject);


router.get('/', (req, res) => {
    res.send('Hello from project routes');
});

export default router;
