import MeetupPost from "@models/MeetupPostModel"
import { connectToDb } from "@utils/database"

export const PUT=async(req,{params:{id}})=>{
    const body = await req.json()
    try {
        await connectToDb()
        const meetup = await MeetupPost.findById(id)
        if (!meetup) {
            return new Response("Meetup not found",{status:404})
        } 
        const updatedMeetup = await MeetupPost.findByIdAndUpdate(id,{
            ...body
        })
        return new Response("Meetup updated Successfully",{status:201})
    } catch (error) {
        return new Response("Some Internal Error Occured",{status:501})
    }
}