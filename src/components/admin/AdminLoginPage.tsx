"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { adminLogin } from "@/lib/api";
import Cookies from "universal-cookie";
import toast from "react-hot-toast";

export function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const cookies = new Cookies();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const bodyData = {
      password,
      username,
    };

    try {
      const { data } = await adminLogin(bodyData);
      if (data) {
        toast.success("Login successful", {
          style: {
            border: "1px solid #1D1D1B",
            padding: "16px",
            color: "#1D1D1B",
            borderRadius: "6px",
          },
          iconTheme: {
            primary: "#008000",
            secondary: "#FFFAEE",
          },
        });
        setIsSubmitting(false);
        const expiryDate = new Date();
        expiryDate.setTime(expiryDate.getTime() + 2 * 60 * 60 * 1000);
        cookies.set("admin_token", data.data.access_token, {
          path: "/",
          expires: expiryDate,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });

        // Redirect to the intended page or default to /admin
        const redirect = searchParams.get("redirect") || "/admin";
        window.location.href = redirect;
      }
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      toast.error(message, {
        style: {
          border: "0.5px solid #1D1D1B",
          padding: "16px",
          color: "#1D1D1B",
          borderRadius: "6px",
        },
        iconTheme: {
          primary: "#FF0000",
          secondary: "#FFFAEE",
        },
      });
      setIsSubmitting(false);
      console.log("Error message:", message);
    }
  };

  return (
    <div className="sm:min-h-screen flex items-center justify-center bg-white pt-[120px] sm:pt-0">
      <div className="bg-white md:p-8 px-4 md:border-[0.5px] md:border-[#C9C9C9] w-full md:max-w-[423px]">
        <div className="md:max-w-[300px] mx-auto md:text-center">
          <h1 className="text-[24px] font-semibold leading-[125%]">
            BELVAPHILIPS’ ADMIN
          </h1>
          <p className="text-base mb-7 leading-[155%] mt-2 text-[#444444]">
            Log In to manage projects and <br /> user requests
          </p>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="rounded-full outline-none bg-[#F4F4F4] px-5 h-[47px] w-full placeholder:text-[#585858]"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="rounded-full outline-none bg-[#F4F4F4] px-5 h-[47px] w-full placeholder:text-[#585858]"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#1D1D1B] cursor-pointer text-white uppercase rounded-full h-[47px] w-full flex items-center justify-center font-semibold text-base"
          >
            {isSubmitting ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
}
