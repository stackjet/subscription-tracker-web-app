"use client";

import { useActionState } from "react";

import { registerUserAction } from "@/data/actions/auth-actions";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { Icons } from "@/components/ui/icons";

export function SignupForm() {
  const [formState, formAction] = useActionState(registerUserAction, undefined);
  
  return (
    <div className="w-full max-w-md">
      <form action={formAction}>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
            <CardDescription>
              Create a new account to manage your subscriptions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company_name">Company Name</Label>
              <Input
                id="company_name"
                name="company_name"
                type="text"
                placeholder="Company Name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Username"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="password"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full">Sign Up</Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" type="button">
                <Icons.google className="mr-2 h-4 w-4" />
                Google
              </Button>
              <Button variant="outline" type="button">
                <Icons.github className="mr-2 h-4 w-4" />
                Github
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
      <div className="mt-4 text-center text-sm">
        Have an account?
        <Link className="underline ml-2" href="signin">
          Sign In
        </Link>
      </div>
    </div>
  );
}