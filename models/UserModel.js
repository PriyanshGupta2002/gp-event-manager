import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    username:{
        type:String,
        required:[true,'Username is required!'],
    },
    image:{
        type:String
    },
    email:{
        type:String,
        unique:[true,'Email already exists'],
        required:[true,'Email is required']
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    }
})
const User  = models.User || model("User",UserSchema)
export default User