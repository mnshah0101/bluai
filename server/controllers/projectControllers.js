import Project from '../models/Project';
import analysisProjectData from '../utils/openAI';

exports.createProject = async (req, res) => {
    try {
        const { title, key, image } = req.body;
        const project = new Project({ title, key, image });
        await project.save();
        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.analyzeProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Perform analysis
        const analysisResults = await analyzeProjectData(project.projectData);
        project.analysisResults = analysisResults;
        await project.save();

        res.json({ project, analysisResults });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};