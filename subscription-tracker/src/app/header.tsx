import React from 'react';
import Link from 'next/link';

import { Button, buttonVariants  } from "@/components/ui/button"

import { useAuth } from "@/app/context/auth";
import { signOutUserAction } from '@/data/actions/auth-actions';

const Header = () => {
    const currentUser = useAuth().currentUser;
    return <header>
        <nav>
            <div className="felx lg:flex-1 lg:justify-end lg:gap-4">
                {currentUser ? <div>
                    <span>{currentUser.email}</span>
                    <br />
                    <Button variant="link" onClick={signOutUserAction}>Sign out</Button>
                </div> : 
                <Button variant="link" asChild>
                    <Link href="/signin">
                        Sign in
                    </Link>
                </Button>   
                }
            </div>
        </nav>
    </header>
};

export default Header;