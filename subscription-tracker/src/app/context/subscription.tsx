"use server";

import { cookies } from 'next/headers'

import {
    createContext,
    useContext,
    useEffect,
    useState
} from 'react';


const cookieStore = await cookies();


export default async function get_supported_subscriptions() {
    const [subscriptions, setSubscriptions] = useState(null);

    useEffect(() => {
        const fetchSubscriptions = async () => {
            console.log(`Access Token: ${cookieStore.get("access_token")?.value}`);
            console.log(`Refresh Token: ${cookieStore.get("refresh_token")?.value}`);
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
            console.log("Response: ", response.status);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Supported Subscriptions: ", data);
            setSubscriptions(data);
        }
        fetchSubscriptions();
    }, []);

    return subscriptions;
};