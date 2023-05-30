import MeetupPost from "@models/MeetupPostModel"
import { connectToDb } from "@utils/database"

export const GET=async(req,{params:{id}})=>{
    try {
        await connectToDb()
        const meetup = await MeetupPost.findById(id).populate("organisedBy")
        if (!meetup) {
            return new Response(`No meetup found with id - ${id}`,{status:404})
        }
        return new Response(JSON.stringify(meetup),{status:201})
    } catch (error) {
        return new Response("Some error occured",{status:501})
    }
}