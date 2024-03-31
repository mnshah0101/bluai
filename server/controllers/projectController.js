import Project from '../models/Project.js';
import fetch from 'node-fetch';
import { getSuggestions } from '../utils/suggestions.js';
import SuggestionModel from '../models/Suggestions.js';
import ProjectModel from '../models/Project.js';

//Creates Project Object
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


//Gets suggestions from OpenAI for specific file in project
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

        //check if the file link matches the repo link
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

        //get file content from github
        const apiLink = `https://api.github.com/repos/${user_name}/${repo_name}/contents/${path}`;
        const response = await fetch(apiLink);
        if (response.status !== 200) {
            return res.status(400).json({ message: "error processing the request" });
        };
        let data = await response.json();
        const content = atob(data.content);

        //get suggestions from OpenAI
        const openAIResponse = await getSuggestions(content);
        console.log(openAIResponse);
        const data_json = JSON.parse(openAIResponse);
    
        //save suggestions to database
        const rating = data_json['Rating'];
        const suggestions = data_json['Suggestions'];
        let tokens = data_json['Tokens'];
        let carbon = tokens.map((token) => Math.round(100*token * 0.02406)/100);
        let water = tokens.map((token) => Math.round(token * 0.4226*100)/100);

        let newSuggestions = {
            propel_user_id: project.propel_user_id,
            project_title: project.title,
            link: path.replace(/\./g, '_'),
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
        
        //update project with suggestions
        project.suggestionFiles.set(suggestionsObject.link.replace(/\./g, '_'), rating);
        const suggestionValues = Array.from(project.suggestionFiles.values());
        const sum = suggestionValues.reduce((acc, val) => acc + val, 0);
        console.log(`SuggestionValues Length: ${suggestionValues.length} Sum: ${sum}`);
        const average = suggestionValues.length > 0 ? sum / suggestionValues.length : 0;
        project.esg_score = average;

        await project.save();

        return res.json({suggestions: suggestionsObject});

    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

//returns suggestions and esg score for a project
export const getProjectStats = async (req, res) => {
    try {

        const project_id = req.body.project_id;
        
        const project = await Project.findById(project_id);
        if(!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        //get suggestions from suggestionFiles in the project
        let suggestions = [];
        for (let [key, _] of project.suggestionFiles) {
            console.log(keyString);
            let suggestion = await SuggestionModel.findOne({link: key});
            suggestions.push(suggestion);
        }

        return res.status(200).json({suggestions: suggestions, esg: project.esg_score});
        
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

//returns all projects associated with the user
export const getUserProjects = async (req, res) => {
    try {
        console.log(req.body)
        const propel_user_id = req.body.user.userId;
        if (!propel_user_id) {
            return res.status(400).json({ message: "missing propel user id" });
        }
        const projects = await Project.find({propel_user_id: propel_user_id});
        if (!projects) {
            return res.status(404).json({ error: 'Projects not found' });
        }

        return res.status(200).json({ projects: projects, message: "The projects are successfully sent" })

    } catch (error) {
        console.error('There has been a problem with your fetch operation for getting users:', error);
    }
}

//returns the carbon and water footprint of a project
export const getFootprint = async (req, res) => {
    try{
        const project_id = req.body.project_id;
        if(!project_id) {
            return res.status(404).json({ error: 'Project id missing' });
        }
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

//returns the project key
export const getProjectKey = async (req, res) => {
    try {
        const project_id = req.body.project_id;
        if(!project_id) {
            return res.status(404).json({ error: 'Project id missing' });
        }
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

//deletes a project
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

//deletes a suggestions object
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
        
        //get the key and the value for the specific link for suggestions object in the Projects suggestionFiles dictionary
        const value = project.suggestionFiles.get(SuggestionObject.link);

        project.suggestionFiles.delete(SuggestionObject.link);
        if (project.esg_score - value == 0 || project.suggestionFiles.size == 0) {
            project.esg_score = 0;
        } else {
            project.esg_score = (project.esg_score * (project.suggestionFiles.size + 1) - value) / (project.suggestionFiles.size);
        }
        await project.save();

        return res.status(200).json({ message: "Suggestions Object deleted successfully" });
    } catch (error) {
        console.error('There has been a problem deleting the suggestions object:', error)
        return res.status(400).json({ error: error.message });
    }
}

//give suggestions associated with that project
export const getProjectSuggestions = async (req, res) => {
    try {
        const project_id = req.body.project_id;

        const project = await ProjectModel.findById(project_id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        
        const project_title = project.title;
        
        const suggestions = await SuggestionModel.find({ project_title: project_title });
        if (!suggestions) {
            return res.status(404).json({ error: 'Suggestions not found' });
        }

        return res.status(200).json({ suggestions: suggestions })
    } catch (error) {
        console.error('There has been a problem retrieving the suggestions for your project:', error);
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