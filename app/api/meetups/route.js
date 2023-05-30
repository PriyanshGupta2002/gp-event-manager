import MeetupPost from "@models/MeetupPostModel";
import { connectToDb } from "@utils/database";

export const GET=async(req,res)=>{
    try {
        await connectToDb()
        const meetups = await MeetupPost.find().populate("organisedBy").sort({createdAt:-1})
        return new Response(JSON.stringify(meetups),{status:201})
    } catch (error) {
        return new Response(error,{status:502})
    }
}