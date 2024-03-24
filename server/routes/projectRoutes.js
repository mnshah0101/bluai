import express from 'express';
import projectController from '../controllers/projectController.js'; // Make sure to use the correct path
import mongoose from 'mongoose';
import UserModel from '../models/User.js';
import ProjectModel from '../models/Project.js';

const router = express.Router();

// Route for creating a new project
router.post('/projects', projectController.createProject);

// Route for analyzing an existing project
router.post('/projects/:projectId/analyze', projectController.analyzeProject);

//Route to check if user exists
router.get('/user/getUser', async (req, res) => {
    const propel_user_id = req.user.userId;
    if(!propel_user_id) {
        return res.status(400).json({ message: "missing propel user id"});
    }

    const userObject = await UserModel.find({ propel_user_id: propel_user_id });
    if (!userObject) {
        return res.status(500).json({message: "No user found" });
    };

    return res.status(200).json(user);
    
});

//Route to create Project after form submission
router.post('/', async (req, res) => {
    const propel_user_id = req.user.userId;
    if(!propel_user_id) {
        return res.status(400).json({ message: "missing propel user id"});
    }
    const description = req.description;
    if(!description) {
        return res.status(400).json({ message: "missing description"});
    }
    const title = req.title;
    if(!title) {
        return res.status(400).json({ message: "missing title"});
    }
    const link = req.link;
    if(!link) {
        return res.status(400).json({ message: "missing title"});
    }

    const newProject = {
        propel_user_id: propel_user_id,
        title: title,
        link: link,
        carbon_footprint: [],
        water_footprint: [],
        tokens: 0,
        sugestions: []
    };

    let project = new ProjectModel(newProject);
    await project.save();
    return res.status(200).json(project);

});



export default router;