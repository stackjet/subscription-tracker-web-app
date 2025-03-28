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

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            
            setSubscriptions(data);
        }
        fetchSubscriptions();
    }, []);

    return subscriptions;
};