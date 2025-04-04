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
    const username = formData.get("username");
    const company_name = formData.get("company_name");
    let tenant = null;
    const fields = {
        email,
        password,
        username: formData.get("username")
    }

    console.log(`Company Name: ${company_name}`);
    if (company_name) {
        try {
            const response = await fetch("api/tenant", {
                method: "POST",
                body: JSON.stringify({
                    company_name: company_name,
                    admin: {
                        email: email,
                        password: password,
                        username: username
                    }
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to create tenant: ${response.statusText}`);
            }

            const responseData = await response.json();
            console.log("Response Data: ", responseData);

            // You can now use responseData as needed
            tenant = responseData.tenant; // Example: assuming the response contains a "tenant" field
        } catch (error) {
            console.error("Error creating tenant:", error);
        }
        return null;
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
        process.env.NEXT_PUBLIC_WEB_API_URI + "/users/signup",
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