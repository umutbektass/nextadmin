import { connectToDB } from "./utils"
import { User,Product } from './models'
export const fetchUsers = async (q,page) => {
    const ITEM_PER_PAGE=2
    const regex = new RegExp(q,"i");
    try {
        await connectToDB()
        const count = await User.find({username:{$regex:regex}}).count()
        const users = await User.find({username: {$regex : regex}})
        .limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (page-1)); 
        return {count,users}
    } catch (error) {
        throw new Error(error)
    }
}

export const fetchProducts = async (q,page) => {
    const ITEM_PER_PAGE=2
    const regex = new RegExp(q,"i");
    try {
        await connectToDB()
        const count = await Product.find({title:{$regex:regex}}).count()
        const products = await Product.find({title: {$regex : regex}})
        .limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (page-1)); 
        return {count,products}
    } catch (error) {
        throw new Error(error)
    }
}