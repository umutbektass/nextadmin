
"use server"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const { User, Product } = require("./models");
const { connectToDB } = require("./utils");
import bcrypt from "bcryptjs"
import { signIn } from "../auth";
import { isRedirectError } from "next/dist/client/components/redirect";
export const addUser = async (formData) => {
    "use server"
    const { username, email, password, phone, address, isAdmin, isActive } = Object.fromEntries(formData);

    try {
        connectToDB()
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            phone,
            address,
            isAdmin,
            isActive
        })
        await newUser.save()
    } catch (error) {
        console.log("error", error)
    }
    revalidatePath("/dashboard/users")
    redirect("/dashboard/users")
}

export const deleteUser = async (formData) => {
    const { id } = Object.fromEntries(formData);
    try {
        connectToDB()
        await User.findByIdAndDelete(id)
    } catch (error) {
        console.log(error)
    }
    revalidatePath("/dashboard/users")
}

export const updateUser = async (formData) => {
    "use server"
    const { id, username, email, password, phone, address, isAdmin, isActive } = Object.fromEntries(formData);

    try {
        connectToDB()
        const updateFields = {
            username, email, password, phone, address, isAdmin, isActive
        }
        Object.keys(updateFields).forEach((key) => (updateFields[key] === "" || undefined) && delete updateFields[key])
        await User.findByIdAndUpdate(id, updateFields)
    } catch (error) {
        console.log("error", error)
    }
    revalidatePath("/dashboard/users")
    redirect("/dashboard/users")
}

export const addProduct = async (formData) => {

    const { title, desc, price, stock, color, size } = Object.fromEntries(formData);

    try {
        connectToDB()

        const newProduct = new Product({
            title,
            desc,
            price,
            stock,
            color,
            size
        })
        await newProduct.save()
    } catch (error) {
        console.log("error", error)
    }
    revalidatePath("/dashboard/products")
    redirect("/dashboard/products")
}





export const deleteProduct = async (formData) => {
    const { id } = Object.fromEntries(formData)
    try {
        connectToDB()
        await Product.findByIdAndDelete(id)
    } catch (error) {
        console.log(error)
    }
    revalidatePath("/dashboard/products")
}



export const updateProduct = async (formData) => {
    const { id, title, desc, price, stock, img, color, size } = Object.fromEntries(formData);
    try {
        connectToDB()
        const updateFields = {
            title, desc, price, stock, img, color, size
        }
        Object.keys(updateFields).forEach(key => (updateFields[key] === "" || undefined) && delete updateFields[key])
        await Product.findByIdAndUpdate(id, updateFields)
    } catch (error) {
        console.log(error)
    }
    revalidatePath("/dashboard/products")
    redirect("/dashboard/products")

}

export const authenticate = async (prevState, formData) => {
    const { username, password } = Object.fromEntries(formData);
    try {
        await signIn("credentials", { username, password });
    } catch (error) {
        if(isRedirectError(error))
            {
                throw error;
            }
            return "Wrong Credentials!";
        
    }
};

