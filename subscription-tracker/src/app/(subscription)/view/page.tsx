'use server';

import { cookies } from 'next/headers';
import axios from 'axios';
import { auth } from "firebase-admin";
import { redirect } from 'next/navigation';
import { decrypt } from '@/app/lib/encryption';

export default async function UserSubscriptionsPage() {
    const cookieStore = await cookies();
    const encryptedAccessToken = cookieStore.get("access_token")?.value;

    if (!encryptedAccessToken) {
        redirect('/signin');
    }

    try {
        const accessToken = decrypt(encryptedAccessToken);
        const decodedToken = await auth().verifyIdToken(accessToken);
        
        const response = await axios.get(
            process.env.NEXT_PUBLIC_WEB_API_URI + "/user-subscription/supported-subscriptions",
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                },
                withCredentials: true,
            }
        );
        
        if (response.status !== 200) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Subscriptions Supported</h1>
                {/* We'll add the dashboard content here */}
            </div>
        );
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
                redirect('/signin');
            }
            throw new Error(`API Error: ${error.message}`);
        }
        throw error;
    }
}
