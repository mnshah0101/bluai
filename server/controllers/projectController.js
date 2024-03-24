import Project from '../models/Project.js';
import fetch from 'node-fetch';
import { analyzeProjectData } from '../utils/openAI.js';
import UserModel from '../models/User.js';
import ProjectModel from '../models/Project.js';

export const analyzeProjectLevelOrder = async (req, res) => {
    try {
        const { projectId } = req.params;
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        const githubLink = project.link;
        const repoName = githubLink.split("github.com/")[1];
        const apiLink = 'https://api.github.com/repos/' + repoName + '/contents';

        console.log(apiLink)
        const response = await fetch(apiLink)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Convert the response to JSON
            })
            .then(data => {
                console.log(data); // Assuming you want to log the decoded data
                const content = atob(data.content); // Assuming 'content' is the field containing Base64-encoded content
                console.log(content);
                return content;
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });

        console.log(response)




        /*
        // Perform analysis
        const analysisResults = await analyzeProjectData(project.projectData); // Ensure this matches what's passed to OpenAI
        project.analysisResults = analysisResults;
        await project.save();

        res.json({ project, analysisResults });
        */


    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};




export const analyzeProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        const githubLink = project.link;
        const repoName = githubLink.split("github.com/")[1];
        const apiLink = 'https://api.github.com/repos/' + repoName + '/contents/server/spindle.js';
        console.log(apiLink)
        fetch(apiLink)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Convert the response to JSON
            })
            .then(data => {
                console.log(data); // Assuming you want to log the decoded data
                const content = atob(data.content); // Assuming 'content' is the field containing Base64-encoded content
                console.log(content);
                return content;
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });








        const openAIResponse = await analyzeProjectData(response);

        // Ensure this matches what's passed to OpenAI
        res(openAIResponse);

        /*
        // Perform analysis
        const analysisResults = await analyzeProjectData(project.projectData); // Ensure this matches what's passed to OpenAI
        project.analysisResults = analysisResults;
        await project.save();

        res.json({ project, analysisResults });
        */


    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getUser = async (req, res) => {
    try {
        const propel_user_id = req.user.userId;
        if (!propel_user_id) {
            return res.status(400).json({ message: "missing propel user id" });
        }

        const userObject = await UserModel.find({ propel_user_id: propel_user_id });
        if (!userObject) {
            return res.status(500).json({ message: "No user found" });
        };

        return res.status(200).json(user);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
};

export const createProject = async (req, res) => {
    try {
        const propel_user_id = req.user.userId;
        if (!propel_user_id) {
            return res.status(400).json({ message: "missing propel user id" });
        }
        const description = req.description;
        if (!description) {
            return res.status(400).json({ message: "missing description" });
        }
        const title = req.title;
        if (!title) {
            return res.status(400).json({ message: "missing title" });
        }
        const link = req.link;
        if (!link) {
            return res.status(400).json({ message: "missing title" });
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

    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}