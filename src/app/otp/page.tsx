"use client";

import { useState, Suspense } from "react";

import { OtpContent } from "@/components/otp-contents/otp-content";

export default function Otp() {
  const [otp, setOtp] = useState("");

  return (
    <main
      style={{
        backgroundImage: "url('/assets/images/background-image.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgba(212, 212, 212, 0.5)",
      }}
      className="min-h-screen flex items-center justify-center bg-[#D4D4D4]"
    >
      <div className="absolute inset-0 bg-[#D4D4D4] opacity-95"></div>
      <Suspense fallback={<p>Loading...</p>}>
        <OtpContent otp={otp} setOtp={setOtp} />
      </Suspense>
    </main>
  );
}
