"use server";

import {
    createContext,
    useContext,
    useEffect,
    useState
} from 'react';


export default async function get_supported_subscriptions() {
    const [subscriptions, setSubscriptions] = useState(null);

    useEffect(() => {
        const fetchSubscriptions = async () => {
            const response = await fetch (
                process.env.NEXT_PUBLIC_WEB_API_URI + "/user-subscription/supported-subscriptions",
                {
                    method: "GET"
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