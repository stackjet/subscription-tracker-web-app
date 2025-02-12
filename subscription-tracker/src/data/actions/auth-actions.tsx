"use server";

import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "@/app/firebase/config";


export async function registerUserAction(prevState: any, formData: FormData) {
    console.log("Hello From Register User Action");

    const email = formData.get("email");
    const password = formData.get("password");
    const fields = {
        email,
        password,
        username: formData.get("username")
    }

    if (typeof email !== "string" || typeof password !== "string") {
        throw new Error("Invalid form data");
    }

    const user = await createUserWithEmailAndPassword(auth, email, password);
    console.log("user", user);
}