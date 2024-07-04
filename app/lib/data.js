import { connectToDB } from "./utils"
import { User } from './models'
export const fetchData = async () => {

    try {
        await connectToDB()
        const users = await User.find()
        return users
    } catch (error) {
        throw new Error(error)
    }
}