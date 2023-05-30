import MeetupPost from "@models/MeetupPostModel"
import { connectToDb } from "@utils/database"

export const DELETE = async(req,{params:{id}})=>{
    try {
        await connectToDb()
        const toBeDeletedPost = await MeetupPost.findById(id)
        if (!toBeDeletedPost) {
            return new Response("Meetup not found",{status:404})
        }
        await MeetupPost.findByIdAndDelete(id)
        return new Response("Meetup successfully deleted",{status:201})
    } catch (error) {
        return new Response("Internal Server Error",{status:501})
    }
}