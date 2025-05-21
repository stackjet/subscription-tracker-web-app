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
const publicRoutes = ["/signin", "/signup", "/signup_v2"];

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
                fetch("/api/login", {
                    method: "POST",
                    headers: {
                      // To Do: Encrypt user.getIdToken() before passing it to the API
                      Authorization: `Bearer ${encrypt(await user.getIdToken())}`,
                    },
                  }).then((response) => {
                    if (response.status === 200) {
                    }
                  });
                setCurrentUser(user);
            }
            else {
                const response = await fetch("/api/logout", {
                    method: "POST",
                  });
              
                  if (response.status === 200) {
                    // Only redirect to signin if we're not on a public route
                    const isPublicRoute = publicRoutes.some(route => pathname?.startsWith(route));
                    if (!isPublicRoute) {
                        router.push("/signin");
                    }
                  }
                setCurrentUser(null);
            }
        });
    }, [pathname]);

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};