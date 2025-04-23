import Image from "next/image";

export default function Signin() {
  return (
    <div
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
          <p className="text-base mb-7 leading-[155%] mt-4 text-[#444444]">
            Let’s bring your products to life with effortless, professional
            photography.
          </p>
        </div>
        <form className="space-y-5">
          <input
            type="email"
            placeholder="Enter your email"
            className="rounded-full outline-none bg-[#F4F4F4] px-5 h-[47px] w-full placeholder:text-[#585858]"
          />

          <button
            type="submit"
            className="bg-[#1D1D1B] text-white uppercase rounded-full h-[47px] w-full flex items-center justify-center  font-semibold text-base "
          >
            Sign In
          </button>
        </form>
        <div className="flex items-center justify-center my-4 w-full max-w-[323px] mx-auto">
          <div className="flex-grow border-t border-[#F1F1F1]"></div>
          <span className="px-3 text-[#A9A8A8] text-base">or</span>
          <div className="flex-grow border-t border-[#F1F1F1]"></div>
        </div>

        <div className="max-w-[323px] mx-auto">
          <button className="flex items-center justify-center w-full h-[44px] border border-[#DADADA] rounded-full text-[#101010]  gap-2">
            <span>
              <Image
                src={"/assets/images/google.svg"}
                alt="google logo"
                width={24}
                height={24}
              />
            </span>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
