//create a Project model in mongoose
import mongoose from 'mongoose';
import CryptoJS from 'crypto-js';

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    propel_user_id: String,
    title: String,
    key : {
        type: String,
        default: CryptoJS.lib.WordArray.random(16).toString()
    },
    link: String,
    carbon_footprint: [{
        type: Object,
    }],
    water_footprint: [{
        type: Object,
    }],
    tokens: Number,
    suggestions: [{type: Object}]
});

let ProjectModel = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

export default ProjectModel;