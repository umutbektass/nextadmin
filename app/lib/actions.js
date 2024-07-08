
"use server"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const { User, Product } = require("./models");
const { connectToDB } = require("./utils");
import bcrypt from "bcryptjs"
export const addUser = async (formData) => {
    "use server"
    const { username, email, password, phone, address, isAdmin, isActive } = Object.fromEntries(formData);

    try {
        connectToDB()
        const salt = bcrypt.genSalt(10);
        const hashedPassword = bcrypt.hash(password, salt)
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