import Project from '../models/Project.js';
import fetch from 'node-fetch';
import { GetSuggsetions } from '../utils/suggesstions.js';
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








        const openAIResponse = await GetSuggsetions(response);

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

        let user = await UserModel.find({ propel_user_id: propel_user_id });
        if (!user) {
            return res.status(500).json({ message: "user not found" });
        }

        user.projects.append(project);
        return res.status(200).json(project);

    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }

}

export const getProjects = async (req, res) => {
    try {
        const propel_user_id = req.user.userId;
        if (!propel_user_id) {
            return res.status(400).json({ message: "missing propel user id" });
        }

        let user = await UserModel.find({ propel_user_id: propel_user_id }).populate('projects')
        if (!user) {
            return res.status(500).json({ message: "user not found" });
        }

        return res.status(200).json({ projects: user.projects, message: "The projects are successfully sent" })

    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

export const makeGPTCall = async (req, res) => {
    try {
        const blu_key = req.body.blu_key;
        if(!blu_key) {
            return res.status(400).json({ message: "missing blu id" });
        }
        const prompt = req.body.prompt;
        if(!prompt) {
            return res.status(400).json({ message: "missing blu id" });
        }
        const open_ai_key = req.body.open_ai_key;
        if(!open_ai_key) {
            return res.status(400).json({ message: "missing blu id" });
        }

        const project = await ProjectModel.find({ key: blu_key });
        if (!project) {
            return "Invalid Blu key";
        };

        const model = "gpt-4-turbo";
        const encoding = Tiktoken.encoding_for_model(model);
        const num_tokens = encoding.encode(prompt).length;

        project.tokens = num_tokens;
        project.water_footprint = num_tokens * .4226;
        project.carbon_footprint = num_tokens * .02406;
        await project.save();

        const openai = new OpenAI({
            apiKey: open_ai_key,
        });

        const response = await openai.chat.completions.create({
            model: model,
            messages: [
                {
                    role: "system",
                    content: `${prompt}`
                },
                {
                    role: "user",
                    content: params.prompt,
                },
            ],
            temperature: 0,
            max_tokens: 1024,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        return response.json();
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}