import User from "@models/UserModel"
import { connectToDb } from "@utils/database"

export const PATCH=async(req,{params})=>{
    const {id}  = await req.json()
    try {
        await connectToDb()
        const user = await User.findById(params.id)
        if (!user) {
            return new Response("User not found",{status:404})
        }
        if (!user.followers.includes(id)) {
            const updatedUser = await User.findByIdAndUpdate(params.id,{$push:{followers:id}})
            await User.findByIdAndUpdate(id,{$push:{following:params.id}})
            return new Response("Successfully followed",{status:201})
        }
        const updatedUser = await User.findByIdAndUpdate(params.id,{$pull:{followers:id}})
        await User.findByIdAndUpdate(id,{$pull:{following:params.id}})
        return new Response("Successfully Unfollowed",{status:201})
       
    } catch (error) {
        return new Response(error,{status:501})
    }
}