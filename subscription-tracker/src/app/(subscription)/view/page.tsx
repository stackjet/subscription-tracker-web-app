import { cookies } from 'next/headers'

import get_supported_subscriptions from "@/app/context/subscription";


const cookieStore = await cookies();

export default async function UserSubscriptionsPage() {
    console.log(`Access Token: ${cookieStore.get("access_token")?.value}`);
    console.log(`\nRefresh Token: ${cookieStore.get("refresh_token")?.value}`);
    // const subscriptions = await get_supported_subscriptions();
    // console.log("Subscriptions: ", subscriptions);

    const response = await fetch (
        process.env.NEXT_PUBLIC_WEB_API_URI + "/user-subscription/supported-subscriptions",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": cookieStore.get("access_token")?.value || "",
            },
        }
    );
    console.log("Response: ", response.json());
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (
        <div>
            <h1>Subscriptions Supported</h1>
        </div>
    );
}