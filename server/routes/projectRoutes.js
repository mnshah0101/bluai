import express from 'express';
import {createProject, analyzeProject, getUser, getProjects, makeGPTCall} from '../controllers/projectController.js'; // Make sure to use the correct path


const router = express.Router();

// Route for creating a new project
router.post('/projects', createProject);

// Route for analyzing an existing project
router.post('/projects/:projectId/analyze', analyzeProject);

//Route to check if user exists
router.get('/user/getUser', getUser);

//Route to get all projects for a user
router.post('/projects/getProjects', getProjects);

//Route to make openai call
router.post('/projects/makeGPTCall', makeGPTCall);

export default router;