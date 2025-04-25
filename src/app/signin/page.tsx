"use client";

import { Suspense } from "react";

import SigninComponent from "@/components/signinComponent";

export default function Signin() {
  
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <SigninComponent />
    </Suspense>
  )
}
