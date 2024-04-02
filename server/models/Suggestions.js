import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SuggestionSchema = new Schema({
    propel_user_id: String,
    project_title: String,
    link: String,
    suggestions: [{type: Object}],
    esg_score: Number,
});

let SuggestionModel = mongoose.models.Suggestion || mongoose.model('Suggestion', SuggestionSchema);

export default SuggestionModel;