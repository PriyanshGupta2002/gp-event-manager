import User from "@models/UserModel"
import { connectToDb } from "@utils/database"

export const GET = async(req,{params:{id}})=>{
    try {
        await connectToDb()
        const user = await User.findById(id)
        if (!user) {
            return new Response("User not found",{status:404})
        }
        return new Response(JSON.stringify(user),{status:201})
    } catch (error) {
        return new Response(error,{status:501})
    }
}