//create a Project model in mongoose
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    title: String,
    key: {
        type: String,
        created_at: {
            type: Date,
            default: Date.now()
        
        }
    },
    link: String
});

let ProjectModel = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

export default ProjectModel;