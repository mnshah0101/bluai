import Project from '../models/Project.js';
import fetch from 'node-fetch';
import { getSuggestions } from '../utils/suggestions.js';
import SuggestionModel from '../models/Suggestions.js';


export const createProject = async (req, res) => {
    try {
        console.log(req)
        const propel_user_id = req.body.user.userId;
        if (!propel_user_id) {
            return res.status(400).json({ message: "missing propel user id" });
        }
        const description = req.body.description;
        if (!description) {
            return res.status(400).json({ message: "missing description" });
        }
        const title = req.body.title;
        if (!title) {
            return res.status(400).json({ message: "missing title" });
        }
        const link = req.body.link;
        if (!link) {
            return res.status(400).json({ message: "missing title" });
        }

        const newProject = {
            propel_user_id: propel_user_id,
            title: title,
            link: link,
            
            suggestions: []
        };

        let project = new Project(newProject);
        await project.save();

        return res.status(200).json({project: project});

    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }

}



export const analyzeProject = async (req, res) => {
    console.log("analyzeProject")
    try {
        const file_link = req.body.file_link;
        if (!file_link) {
            return res.status(400).json({ message: "missing file link" });
        }     
        const project_id = req.body.project_id;
        if (!project_id) {
            return res.status(400).json({ message: "missing project id" });
        }   
        const project = await Project.findById(project_id);
        if (!project) {
            return res.status(400).json({ error: 'Project not found' });
        }


        const repoLink = project.link;
        const regex = new RegExp(repoLink);
        console.log(repoLink, file_link);
        if (!regex.test(file_link)) {
            return res.status(400).json({ message: "file link does not match repo link" });
        }

        const splitLink = file_link.split("/");
        let user_name = splitLink[3];
        let repo_name = splitLink[4];
        let path = file_link.split("/main/")[1];

        const apiLink = `https://api.github.com/repos/${user_name}/${repo_name}/contents/${path}`;
        const response = await fetch(apiLink);
        if (response.status !== 200) {
            return res.status(400).json({ message: "error processing the request" });
        };
        let data = await response.json();
        const content = atob(data.content);

        const openAIResponse = await getSuggestions(content);
        console.log(`Openai response: ${openAIResponse}`);

        const data_json = JSON.parse(openAIResponse);
    
        const rating = data_json['Rating'];
        const suggestions = data_json['Suggestions'];
        let tokens = data_json['Tokens'];
        let carbon = tokens.map((token) => Math.round(100*token * 0.02406)/100);
        let water = tokens.map((token) => Math.round(token * 0.4226*100)/100);

        
        let newSuggestions = {
            propel_user_id: project.propel_user_id,
            link: path,
            title: project.title,
            suggestions: {},
            esg_score: rating,
        };
        
        const suggestionsObject = new SuggestionModel(newSuggestions);

        let json = suggestions.map((suggestion, index) => {
            return {
                suggestion: suggestion,
                tokens_saved: tokens[index],
                carbon_saved: carbon[index],
                water_saved: water[index],
            };
        });

        suggestionsObject.suggestions = json;

        await suggestionsObject.save();
        
        const suggestionValues = Array.from(project.suggestionFiles.values());
        const sum = suggestionValues.reduce((acc, val) => acc + val, 0);
        const average = (sum + rating) / (suggestionValues.length + 1);
        project.esg_score = average;

        project.suggestionFiles.set(suggestionsObject.link.replace(/\./g, '_'), rating);

        await project.save();

        return res.json({suggestions: openAIResponse});

    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

export const returnSuggestions = async (req, res) => {
    try {

        const { project_id} = req.params;
        
        const project = await Project.findById(project_id);
        if(!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        return res.status(200).json({suggestions: project.suggestions, esg: project.esg_score});
        
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}


export const getProjects = async (req, res) => {
    try {
        console.log(req.body)
        const propel_user_id = req.body.user.userId;
        if (!propel_user_id) {
            return res.status(400).json({ message: "missing propel user id" });
        }
        const projects = await Project.find({propel_user_id: propel_user_id});

        return res.status(200).json({ projects: projects, message: "The projects are successfully sent" })

    } catch (error) {
        console.error('There has been a problem with your fetch operation for getting users:', error);
    }
}

export const getFootprint = async (req, res) => {
    try{
        const { project_id} = req.params;
        const project = await Project.findById(project_id);
        if(!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        //set x_ticks to be the keys in the projects.tokens object
        let x_ticks = Object.keys(project.tokens);
        let tokens = Object.values(project.tokens);
        let carbon_footprint = Object.values(project.carbon_footprint);
        let water_footprint = Object.values(project.water_footprint);


        return res.status(200).json({tokens, carbon_footprint, water_footprint, x_ticks});

    }
    catch (error) {
        console.error('There has been a problem with your fetch operation:', error)
        return res.status(400).json({ error: error.message });
    }
}


export const getProjectKey = async (req, res) => {
    try {
        const { project_id} = req.params;
        const project = await Project.findById(project_id);
        if(!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        return res.status(200).json({key: project.key});
    }
    catch (error) {
        console.error('There has been a problem with your fetch operation:', error)
        return res.status(400).json({ error: error.message });
    }
}

export const deleteProject = async (req, res) => {
    try {
        const project_id = req.body.project_id;
        if(!project_id) {
            return res.status(404).json({ error: 'Project id missing' });
        }
        const project = await Project.findByIdAndDelete(project_id);
        if(!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        return res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        console.error('There has been a problem deleting the project:', error)
        return res.status(400).json({ error: error.message });
    }
}

export const deleteSuggestions = async (req, res) => {
    try {
        const suggestions_id = req.body.suggestions_id;
        if(!suggestions_id) {
            return res.status(404).json({ error: 'Suggestion path missing' });
        }
        const SuggestionObject = await SuggestionModel.findByIdAndDelete(suggestions_id);
        if (!SuggestionObject) {
            return res.status(404).json({ error: 'Suggestions object not found' });
        }

        //delete from project and change esg score
        const project = await Project.findOne({ propel_user_id: SuggestionObject.propel_user_id });
        if (!project.suggestionFiles.size - 1 == 0) {
            project.esg_score = 0;
        } else {
            project.esg_score = (project.esg_score * project.suggestionFiles.size - project.suggestionFiles[SuggestionObject.link.replace(/\./g, '_')]) / (project.suggestionFiles.size - 1);
        }
        project.suggestionFiles.delete(SuggestionObject.link.replace(/\./g, '_'));
        await project.save();

        return res.status(200).json({ message: "Suggestions Object deleted successfully" });
    } catch (error) {
        console.error('There has been a problem deleting the suggestions object:', error)
        return res.status(400).json({ error: error.message });
    }
}


//give suggestions associated with that account
export const getUserSuggestions = async (req, res) => {
    try {
        const propel_user_id = req.body.user.userId;
        if (!propel_user_id) {
            return res.status(400).json({ message: "missing propel user id" });
        }
        const suggestions = await SuggestionModel.find({ propel_user_id: propel_user_id });

        return res.status(200).json({ suggestions: suggestions })

    } catch (error) {
        console.error('There has been a problem with your fetch operation for getting users:', error);
    }
}