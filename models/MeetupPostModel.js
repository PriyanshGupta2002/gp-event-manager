import { Schema, model, models } from "mongoose";
const MeetupPostModel=new Schema({
    name:{
        type:"String",
        required:[true,"Name is required"]
    },
    desc:{
        type:"String",
        required:[true,"Description of the event is required"]
    },
    organisedBy:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    date:{
        type:Date,
    },
    address:{
        type:"String",
        required:[true,"Address is required"]
    },
    image:{
        type:"String",
    }

},{
    timestamps:true
})
const MeetupPost = models.MeetupPost || model("MeetupPost",MeetupPostModel)
export default MeetupPost