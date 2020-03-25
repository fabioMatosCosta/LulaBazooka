const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[A-Za-z]+$/.test(v)
            },
            message: props => `${props.value}is not a valid username.Alphabetic chars only`
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(v);
            },
            message: props => `${props.value}is not a valid password.8 chars at least one uppercase one lowercase`
        }
    }     ,
        email:{
            required:true,
            type:String
        },
        firstName:{
            type:String
        },
        lastName:{
            type:String
        }
})

const User = mongoose.model("User", userSchema);

module.exports = User;