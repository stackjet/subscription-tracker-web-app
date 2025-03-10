"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState
} from 'react';
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

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                user.getIdToken().then((token) => {
                    document.cookie = `access_token=${token}; path=/; Secure; HttpOnly`;
                    document.cookie = `refresh_token=${user.refreshToken}; path=/; Secure; HttpOnly`;
                });
                setCurrentUser(user);
            }
            else {
                document.cookie = "access_token=; path=/";
                document.cookie = "refresh_token=; path=/";
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