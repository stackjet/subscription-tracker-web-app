"use server";

import { UserCredential, createUserWithEmailAndPassword } from "firebase/auth";

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

    const user: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
    const token = await user.user.getIdToken();

    const payload = {
        username: fields.username,
        email: user.user.email,
        firebase_api_id: user.user.uid,
        firebase_access_token: token,
    };

    const response = await fetch(
        process.env.WEB_API_URI + "/users/signup",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        }
    );
};