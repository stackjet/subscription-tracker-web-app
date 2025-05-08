"use client";

import { useActionState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { auth, provider } from "@/app/firebase/config";
import { signInUserAction } from "@/data/actions/auth-actions";
import { signInWithPopup } from "firebase/auth";
import { Icons } from "@/components/ui/icons";

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
import { Alert, AlertDescription } from "@/components/ui/alert";

export function SigninForm() {
  const [formState, formAction] = useActionState(signInUserAction, undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        router.push('/dashboard');
      }
    } catch (error) {
      setError('Failed to sign in with Google. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form action={async (formData) => {
        try {
          setIsLoading(true);
          setError(null);
          await formAction(formData);
          router.push('/dashboard');
        } catch (error) {
          setError('Invalid email or password. Please try again.');
        } finally {
          setIsLoading(false);
        }
      }}>
        <Card className="border-2">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="rounded border-gray-300"
                />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Forgot password?
              </Link>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
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
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
              <Icons.google className="mr-2 h-4 w-4" />
              Google
            </Button>
          </CardFooter>
        </Card>
        <div className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link className="text-blue-600 hover:text-blue-800" href="/signup">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}