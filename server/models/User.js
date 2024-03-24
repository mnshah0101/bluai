//take coed with endpoitn and then handle in express iwth propelauth db
//make user model
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    propel_user_id: String,
    username: String,
    projects: [
        {
            type: Object,
            ref: 'Project'
        }
    ],
    profile_picture: String
});

let UserModel = mongoose.models.User || mongoose.model('User', UserSchema); // Create a User model

export default UserModel;