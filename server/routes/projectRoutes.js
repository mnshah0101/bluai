import express from 'express';
import projectController from '../controllers/projectController.js'; // Make sure to use the correct path


const router = express.Router();

// Route for creating a new project
router.post('/projects', projectController.createProject);

// Route for analyzing an existing project
router.post('/projects/:projectId/analyze', projectController.analyzeProject);

//Route to check if user exists
router.get('/user/getUser', projectController.getUser);

//Route to create Project after form submission
router.post('/api/createProject', projectController.createProject);

export default router;