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
                console.log('User is signed in. User: ', user);
                setCurrentUser(user);
            }
            else {
                console.log('User is signed out.');
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