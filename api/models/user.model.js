import mongoose from "mongoose";

//creating user Schema => A Mongoose schema defines the structure of the document, default values, validators, etc., similar to how you might define the structure of tables in SQL databases.

//Creating as skeleton of how should the db look like
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true

    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true,

    },


},
    { timestamps: true })
//The timestamps: true option in Mongoose automatically adds createdAt and updatedAt properties to your schema,
// recording the creation and last update time of your documents respectively.
//Mainly used for sorting

//actual module creating//

const User = mongoose.model("User", userSchema);

export default User