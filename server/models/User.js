//take coed with endpoitn and then handle in express iwth propelauth db
//make user model

const UserSchema = new Schema({
    githubBearer: String,
    profile_picture: {
        type: String,
        default: "https://i.ibb.co/ctJJ5Q7/image.png"
    },
});

let UserModel = mongoose.models.User || mongoose.model('User', UserSchema); // Create a User model

export default UserModel;