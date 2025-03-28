'use server';

import { cookies } from 'next/headers';
import axios from 'axios';


export default async function UserSubscriptionsPage() {
    const cookieStore = await cookies();
    const access_token = cookieStore.get("access_token")?.value;
    const refresh_token = cookieStore.get("refresh_token")?.value;
    const response = await axios.get(
        process.env.NEXT_PUBLIC_WEB_API_URI + "/user-subscription/supported-subscriptions",
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`,
            },
            withCredentials: true,
        }
    )
    
    if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (
        <div>
            <h1>Subscriptions Supported</h1>
        </div>
    );
}
