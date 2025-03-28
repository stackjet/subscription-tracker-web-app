"use client";

import { 
    UserCredential, 
    browserLocalPersistence,
    createUserWithEmailAndPassword, 
    setPersistence, 
    signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "@/app/firebase/config";


export async function registerUserAction(prevState: any, formData: FormData) {

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


export async function signInUserAction(prevState: any, formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");

    if (typeof email !== "string" || typeof password !== "string") {
        throw new Error("Invalid form data");
    }

    const user = await signInWithEmailAndPassword(auth, email, password);

    return user;
}

export async function signOutUserAction() {
    auth.signOut();
}