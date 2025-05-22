"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState
} from 'react';
import { useRouter, usePathname } from "next/navigation";
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '@/app/firebase/config';
import { encrypt } from '../lib/encryption';

// Define public routes that don't require authentication
const publicRoutes = ["/", "/signin", "/signup", "/signup_v2"];

export const AuthContext = createContext<any | null>({
    currentUser: null,
});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const [currentUser, setCurrentUser] = useState<any | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const response = await fetch("/api/login", {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${await user.getIdToken()}`,
                        },
                    });
                    
                    if (response.status === 200) {
                        setCurrentUser(user);
                    }
                } catch (error) {
                    console.error("Login error:", error);
                }
            } else {
                try {
                    const response = await fetch("/api/logout", {
                        method: "POST",
                    });
                    
                    if (response.status === 200) {
                        setCurrentUser(null);
                        // Only redirect to signin if we're not on a public route
                        const isPublicRoute = publicRoutes.some(route => 
                            pathname === route || pathname?.startsWith(route + '/')
                        );
                        if (!isPublicRoute) {
                            router.push("/signin");
                        }
                    }
                } catch (error) {
                    console.error("Logout error:", error);
                }
            }
        });
    }, [pathname, router]);

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};