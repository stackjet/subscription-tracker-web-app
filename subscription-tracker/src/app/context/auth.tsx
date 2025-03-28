"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState
} from 'react';
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '@/app/firebase/config';


export const AuthContext = createContext<any | null>({
    currentUser: null,
});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const [currentUser, setCurrentUser] = useState<any | null>(null);
    const router = useRouter()

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                fetch("/api/login", {
                    method: "POST",
                    headers: {
                      Authorization: `Bearer ${await user.getIdToken()}`,
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
                    router.push("/signin");
                  }
                setCurrentUser(null);
            }
        });
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};