"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { memberSignupSchema } from "./schema";
import * as z from "zod";

// Use the imported schema
type FormData = z.infer<typeof memberSignupSchema>;

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export default function MemberSignupPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(memberSignupSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Step 1: Create Firebase user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // Get the Firebase ID token
      const idToken = await userCredential.user.getIdToken();

      // Step 2: Register member with your FastAPI backend
      const response = await fetch(`${API_BASE_URL}/api/members`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          member: {
            uid: userCredential.user.uid,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            organizationCode: data.organizationCode,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to create member account");
      }

      // Redirect to dashboard or onboarding
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Signup error:", error);
      
      // Handle specific Firebase Auth errors
      if (error.code === 'auth/email-already-in-use') {
        setError("email", {
          type: "manual",
          message: "This email is already registered. Please use a different email or sign in.",
        });
      } else {
        setError("root", {
          type: "manual",
          message: error.message || "Failed to create account. Please try again.",
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-2">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-sm p-10">
        <Link href="/signup_v2" className="flex items-center text-sm text-primary mb-6 hover:underline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to options
        </Link>
        <h1 className="text-2xl font-bold mb-1">Join as a Member</h1>
        <p className="text-muted-foreground mb-8">Create your account to join your organization.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="firstName">First Name</Label>
              <Input 
                id="firstName"
                {...register("firstName")}
                placeholder="Enter your first name"
                aria-invalid={!!errors.firstName}
                autoComplete="given-name"
              />
              {errors.firstName && (
                <p className="text-sm text-red-500 mt-1">{errors.firstName.message}</p>
              )}
            </div>
            <div className="flex-1">
              <Label htmlFor="lastName">Last Name</Label>
              <Input 
                id="lastName"
                {...register("lastName")}
                placeholder="Enter your last name"
                aria-invalid={!!errors.lastName}
                autoComplete="family-name"
              />
              {errors.lastName && (
                <p className="text-sm text-red-500 mt-1">{errors.lastName.message}</p>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="organizationCode">Organization Code</Label>
            <Input 
              id="organizationCode"
              {...register("organizationCode")}
              placeholder="Enter your organization code"
              aria-invalid={!!errors.organizationCode}
              autoComplete="off"
            />
            {errors.organizationCode && (
              <p className="text-sm text-red-500 mt-1">{errors.organizationCode.message}</p>
            )}
            <p className="text-sm text-muted-foreground mt-1">You can get this code from your organization administrator</p>
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email"
              type="email"
              {...register("email")}
              placeholder="Enter your email address"
              aria-invalid={!!errors.email}
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password"
              type="password"
              {...register("password")}
              placeholder="Create a password"
              aria-invalid={!!errors.password}
              autoComplete="new-password"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
            )}
            <p className="text-sm text-muted-foreground mt-1">Password must be at least 8 characters long</p>
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input 
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
              placeholder="Confirm your password"
              aria-invalid={!!errors.confirmPassword}
              autoComplete="new-password"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>
          {errors.root && (
            <p className="text-sm text-red-500 mt-1">{errors.root.message}</p>
          )}
          <Button 
            className="w-full mt-2" 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
        <div className="text-center text-sm mt-6 text-muted-foreground">
          Already have an account?{' '}
          <Link href="/signin" className="text-primary hover:underline">Log in</Link>
        </div>
      </div>
    </div>
  );
} 