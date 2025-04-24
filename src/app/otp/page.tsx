"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { OtpContent } from "@/components/otp-contents/otp-content";

export default function Otp() {
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const next = searchParams.get("next");

  const supabase = createClient();

  const verifyOtp = async () => {
    if (otp.length === 6 && email) {
      try {
        const { error } = await supabase.auth.verifyOtp({
          email,
          token: otp,
          type: 'email'
        });

        if (error) throw error;

        router.push(next || "/");
      } catch (error) {
        console.error('Error verifying OTP:', error);
        // TODO: Handle error appropriately
      }
    }
  };

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
        <OtpContent handleContinue={verifyOtp} otp={otp} setOtp={setOtp} />
      </Suspense>
    </main>
  );
}
