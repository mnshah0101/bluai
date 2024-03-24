import Project from '../models/Project.js';
import fetch from 'node-fetch';
import { analyzeProjectData } from '../utils/openAI.js';

export const createProject = async (req, res) => {
    console.log('hi')
    try {
        const { title, key, link } = req.body;
        const project = new Project({ title, key, link });
        await project.save();
        res.status(201).json({project : project, message: 'Project created' });
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error });
    }
};


export const analyzeProjectLevelOrder = async (req, res) => {
    try {
        const { projectId} = req.params;
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
        const { projectId} = req.params;
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
