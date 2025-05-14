import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { OTPInput } from "./otp-inputs";
import Image from "next/image";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Cookies from "universal-cookie";
import { createUsers, getUserById } from "@/lib/api";
import { toast } from "react-hot-toast";
import setAuthToken from "@/lib/api/setAuthToken";
import { useAppSelector } from "@/lib/redux/hooks";

const formatEmail = (email: string) => {
  if (!email) return "";
  const [localPart, domain] = email.split("@");
  if (localPart.length <= 3) return email;
  return `${localPart.slice(0, 3)}...@${domain}`;
};

export function OtpContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const formattedEmail = formatEmail(email);
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isCheckingUser, setIsCheckingUser] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    companyName: "",
  });
  const [countryCode, setCountryCode] = useState("+234");
  const cookies = new Cookies();
  const supabase = createClient();
  const { userId } = useAppSelector((state) => state.user);

  const checkIfUserExists = async (userId: string) => {
    setIsCheckingUser(true);
    const token = cookies.get("user_token");

    if (token) {
      setAuthToken(token);
    }

    if (userId) {
      try {
        const { data: userData } = await getUserById(userId);
        setIsCheckingUser(false);
        return userData && userData.data ? true : false;
      } catch (error: any) {
        setIsCheckingUser(false);

        if (error.response && error.response.status === 404) {
          return false;
        }

        if (error.response && error.response.status !== 404) {
          toast.error("Error checking user account. Please try again.", {
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
        }

        return false;
      }
    }

    setIsCheckingUser(false);
    return false;
  };

  const verifyOtp = async () => {
    if (otp.length !== 6 || !email) {
      toast.error("Please enter a valid OTP", {
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
      return;
    }

    setIsSigningIn(true);

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "email",
      });

      if (error) throw error;

      // Get the user ID from the session
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const currentUserId = session?.user?.id;

      if (currentUserId) {
        // Check if the user already exists in database
        const userExists = await checkIfUserExists(currentUserId);

        if (userExists) {
          toast.success("Sign in successful", {
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
          router.push("/");
        } else {
          // If user doesn't exist, show the registration form
          setIsOtpVerified(true);
        }
      }
    } catch (error: any) {
      console.error("Error verifying OTP:", error);
      toast.error("Invalid OTP. Please try again.", {
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
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleFinishSignIn = async () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.phoneNumber ||
      !formData.companyName
    ) {
      toast.error("Please fill in all required fields", {
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
      return;
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();
    const currentUserId = session?.user?.id;

    if (!currentUserId) {
      toast.error("Authentication error. Please try signing in again.", {
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
      return;
    }

    setIsSigningIn(true);
    const token = cookies.get("user_token");
    const fullName = `${formData.firstName} ${formData.lastName}`;
    const bodyData = {
      company_name: formData.companyName,
      email: email,
      id: currentUserId,
      name: fullName,
      phone_number: `${countryCode}${formData.phoneNumber}`,
    };

    if (token) {
      setAuthToken(token);
    }

    try {
      const { data } = await createUsers(bodyData);

      if (data) {
        toast.success("Registration successful", {
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
        router.push("/");
      }
    } catch (error: any) {
      console.error("Error finishing sign-in:", error);
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
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const countryCodes = ["+234", "+1", "+44", "+91"];

  return (
    <>
      <div className="text-center bg-white shadow max-w-[423px] w-full p-8 z-10 hidden lg:block">
        <div className="flex items-center gap-[3.68px] justify-center mb-[40.62px]">
          <Image
            src="/assets/images/belvaphilips.svg"
            width={20.28}
            height={20.12}
            alt="belvaphilips imagery"
          />
          <span className="font-logo text-[15.24px] flex items-center gap-[2.45px]">
            <span className="font-black">BELVAPHILIPS</span>
            <span className="font-light">IMAGERY</span>
          </span>
        </div>
        {isOtpVerified ? (
          <div className="max-w-[360px] mx-auto text-center">
            <h1 className="text-[24px] font-semibold leading-[125%]">
              WELCOME TO <br /> BELVAPHILIPS IMAGERY
            </h1>
            <div className="mt-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First name"
                className="w-full px-5 h-[47px] mb-3 rounded-full bg-[#F4F4F4] outline-none"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last name"
                className="w-full px-5 h-[47px] mb-3 rounded-full bg-[#F4F4F4] outline-none"
              />
              <div className="flex mb-3">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className=" px-5 h-[47px] bg-[#F4F4F4] outline-none rounded-l-full"
                >
                  {countryCodes.map((code) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Phone number"
                  className="w-full px-5 h-[47px] bg-[#F4F4F4] outline-none rounded-r-full"
                />
              </div>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Company name"
                className="w-full px-5 h-[47px] mb-3 rounded-full bg-[#F4F4F4] outline-none"
              />
              <button
                onClick={handleFinishSignIn}
                disabled={isSigningIn}
                className="bg-[#1D1D1B] text-white uppercase rounded-full h-[47px] w-full flex items-center justify-center font-semibold text-base mt-2 cursor-pointer"
              >
                {isSigningIn ? "Registering..." : "FINISH SIGN IN"}
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-[300px] mx-auto text-center">
            <h1 className="text-[24px] font-semibold leading-[125%]">
              WELCOME TO <br /> BELVAPHILIPS IMAGERY
            </h1>
            <p className="text-base leading-[155%] mt-2 mb-1 text-[#444444]">
              Enter the otp we sent to the <br /> provided email address
            </p>
            <button
              onClick={() => router.back()}
              className="text-[#C49524] hover:underline text-base outline-none mb-7 font-semibold cursor-pointer"
            >
              Change here
            </button>
            <div className="flex justify-center">
              <OTPInput length={6} onChange={setOtp} />
            </div>
            <div className="mt-3">
              <button
                onClick={verifyOtp}
                disabled={isSigningIn || isCheckingUser}
                type="submit"
                className="bg-[#1D1D1B] cursor-pointer text-white uppercase rounded-full h-[47px] w-full flex items-center justify-center font-semibold text-base"
              >
                {isSigningIn
                  ? "Verifying..."
                  : isCheckingUser
                  ? "Checking..."
                  : "Verify"}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="lg:hidden block pt-[68px] px-4">
        <div className="flex items-center gap-[3.68px] mb-[61.35px]">
          <Image
            src={"/assets/images/belvaphilips.svg"}
            width={30.92}
            height={23.65}
            alt="belvaphilips imagery"
          />
          <span
            className={`font-logo text-[17.92px] flex items-center gap-[2.45px]`}
          >
            <span className={`font-black`}>BELVAPHILIPS</span>
            <span className="font-light">IMAGERY</span>
          </span>
        </div>

        {isOtpVerified ? (
          <div className="max-w-[360px] text-left">
            <h1 className="text-[24px] font-semibold leading-[125%]">
              WELCOME TO <br /> BELVAPHILIPS IMAGERY
            </h1>
            <div className="mt-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First name"
                className="w-full px-5 h-[47px] mb-3 rounded-full bg-[#F4F4F4] outline-none"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last name"
                className="w-full px-5 h-[47px] mb-3 rounded-full bg-[#F4F4F4] outline-none"
              />
              <div className="flex mb-3">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className=" px-5 h-[47px] bg-[#F4F4F4] outline-none rounded-l-full"
                >
                  {countryCodes.map((code) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Phone number"
                  className="w-full px-5 h-[47px] bg-[#F4F4F4] outline-none rounded-r-full"
                />
              </div>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Company name"
                className="w-full px-5 h-[47px] mb-3 rounded-full bg-[#F4F4F4] outline-none"
              />
              <button
                onClick={handleFinishSignIn}
                disabled={isSigningIn}
                className="bg-[#1D1D1B] text-white uppercase rounded-full h-[47px] w-full flex items-center justify-center font-semibold text-base mt-2 cursor-pointer"
              >
                {isSigningIn ? "Registering..." : "FINISH SIGN IN"}
              </button>
            </div>
          </div>
        ) : (
          <div className=" text-left">
            <h1 className="text-[24px] font-semibold leading-[125%]">
              WELCOME TO <br /> BELVAPHILIPS IMAGERY
            </h1>
            <p className="text-base leading-[155%] mt-2 mb-1 text-[#444444]">
              Enter the otp we sent to the provided email address{" "}
              <span
                onClick={() => router.back()}
                className="text-[#C49524] hover:underline text-base outline-none mb-7 font-semibold cursor-pointer"
              >
                {" "}
                Change here
              </span>
            </p>

            <div className="flex  mt-7 w-full">
              <OTPInput length={6} onChange={setOtp} />
            </div>
            <div className="mt-3">
              <button
                onClick={verifyOtp}
                disabled={isSigningIn || isCheckingUser}
                type="submit"
                className="bg-[#1D1D1B] cursor-pointer text-white uppercase rounded-full h-[47px] w-full flex items-center justify-center font-semibold text-base"
              >
                {isSigningIn
                  ? "Verifying..."
                  : isCheckingUser
                  ? "Checking..."
                  : "Verify"}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
