import React from 'react';
import Link from 'next/link';
import { auth } from "firebase-admin";

import { Button, buttonVariants  } from "@/components/ui/button"
import { cookies } from 'next/headers';
import { signOutUserAction } from '@/data/actions/auth-actions';

const Header = async () => {
    const _cookies = await cookies();
    const accessToken = _cookies.get("access_token")?.value;
    const token = null;
    let currentUser = null;

    if (accessToken) {
        try {
            const decodedToken = await auth().verifyIdToken(accessToken);
            currentUser = { email: decodedToken.email }; // Extract user details from the token
        } catch (error) {
            console.error("Error verifying token:", error);
        }
    }
    
    return (
        <header>
            <nav>
                <div className="flex lg:flex-1 lg:justify-end lg:gap-4">
                    {currentUser ? (
                        <div>
                            <span>{currentUser.email}</span>
                            <br />
                            <Button variant="link" onClick={signOutUserAction}>Sign out</Button>
                        </div>
                    ) : (
                        <Button variant="link" asChild>
                            <Link href="/signin">
                                Sign in
                            </Link>
                        </Button>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;