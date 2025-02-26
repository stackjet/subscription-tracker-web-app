'use client';

import { useAuth } from "@/app/context/auth";
import get_supported_subscriptions from "@/app/context/subscription";


export default async function UserSubscriptionsPage() {
    const user = useAuth().currentUser;
    // const subscriptions = await get_supported_subscriptions();
    // console.log("Subscriptions: ", subscriptions);

    return (
        <div>
            <h1>Subscriptions Supported</h1>
        </div>
    );
}