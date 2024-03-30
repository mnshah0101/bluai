//create a Project model in mongoose
import mongoose from 'mongoose';
import CryptoJS from 'crypto-js';

let dateArray = {}

for (let i = 0; i < 30; i++) {
  let d = new Date();
  d.setDate(d.getDate() - i);
  let dateKey = `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${('0' + d.getDate()).slice(-2)}`; 
  dateArray[dateKey] = 0;
}



const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    propel_user_id: String,
    title: String,
    key : {
        type: String,
        default: CryptoJS.lib.WordArray.random(16).toString()
    },
    link: String,
    carbon_footprint: {
        type: Object,
        default: dateArray
    },
    water_footprint:{
        type: Object,
        default: dateArray
    },
    tokens:{
        type: Object,
        default: dateArray

    },
    suggestionFiles: {
        type: Map,
        of: Number,
        default: {}
    },
    esg_score: Number,
    
});

let ProjectModel = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

export default ProjectModel;