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
    image: {
        type: String,
        default: "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"
    },
});

let ProjectModel = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

export default ProjectModel;