import { useSearchParams } from "next/navigation";

import { useRouter } from "next/navigation";
import { OTPInput } from "./otp-inputs";
import Image from "next/image";

const formatEmail = (email: string) => {
  if (!email) return "";
  const [localPart, domain] = email.split("@");
  if (localPart.length <= 3) return email;
  return `${localPart.slice(0, 3)}...@${domain}`;
};

export function OtpContent({
  handleContinue,

  otp,
  setOtp,
}: {
  handleContinue: () => void;

  otp: string;
  setOtp: (otp: string) => void;
}) {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const formattedEmail = formatEmail(email);
  const router = useRouter();

  console.log(email);

  return (
    <div className="text-center bg-white shadow max-w-[423px] w-full p-8 z-10">
      <div className="flex items-center gap-[3.68px] justify-center mb-[40.62px]">
        <Image
          src={"/assets/images/belvaphilips.svg"}
          width={20.28}
          height={20.12}
          alt="belvaphilips imagery"
        />
        <span
          className={`font-logo text-[15.24px] flex items-center gap-[2.45px]`}
        >
          <span className={`font-black`}>BELVAPHILIPS</span>
          <span className="font-light">IMAGERY</span>
        </span>
      </div>
      <div className="max-w-[300px] mx-auto text-center">
        <h1 className="text-[24px] font-semibold leading-[125%]">
          WELCOME TO <br /> BELVAPHILIPS IMAGERY
        </h1>
        <p className="text-base  leading-[155%] mt-2 mb-1 text-[#444444]">
          Enter the otp we sent to the <br /> provided email address
        </p>
        <button
          onClick={() => router.back()}
          className="text-[#C49524] hover:underline text-base outline-none mb-7 font-semibold cursor-pointer"
        >
          Change here
        </button>
      </div>
      <div className="flex justify-center">
        <OTPInput length={6} onChange={setOtp} />
      </div>
      <div className="mt-3">
        <button
          onClick={handleContinue}
          type="submit"
          className="bg-[#1D1D1B] cursor-pointer text-white uppercase rounded-full h-[47px] w-full flex items-center justify-center  font-semibold text-base "
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
