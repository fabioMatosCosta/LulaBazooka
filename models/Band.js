const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const bandSchema = new Schema({
    bandName: {
        type: String,
        required: true,

    },
    genres: [{

        type: String,
//        enum:["Metal","Rock","Hard Rock","Progressive Metal"]
    }],
    info:String,
    admin: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
})

const Band = mongoose.model("Band",bandSchema)
module.exports = Band;