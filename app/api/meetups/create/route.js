import MeetupPost from "@models/MeetupPostModel"
import { connectToDb } from "@utils/database"

export const POST=async(req,res)=>{
    try {
        await connectToDb()
        const {name,desc,organisedBy,date,address,image} = await req.json()
        const newMeetupPost = new MeetupPost({
            name, 
            desc,
            organisedBy,
            date,
            address,
            image
        })
        await newMeetupPost.save()
        return new Response("Meetup Post Created Successfully",{status:201})
    } catch (error) {
            return new Response(error,{status:502})
    }
}