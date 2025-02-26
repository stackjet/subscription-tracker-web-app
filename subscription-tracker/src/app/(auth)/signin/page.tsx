"use client"; 

import { SigninForm } from "@/app/components/forms/signin-form";

import { useAuth } from "@/app/context/auth";

export default function SignInRoute() {
  return <SigninForm />;
}