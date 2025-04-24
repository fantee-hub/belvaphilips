export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white p-8 border-[0.5px] border-[#C9C9C9] w-full max-w-[423px]">
        <div className="max-w-[300px] mx-auto text-center">
          <h1 className="text-[24px] font-semibold leading-[125%]">
            BELVAPHILIPS’ ADMIN
          </h1>
          <p className="text-base mb-7 leading-[155%] mt-2 text-[#444444]">
            Log In to manage projects and <br /> user requests
          </p>
        </div>
        <form className="space-y-5">
          <div className="mb-4">
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="rounded-full outline-none bg-[#F4F4F4] px-5 h-[47px] w-full placeholder:text-[#585858]"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="rounded-full outline-none bg-[#F4F4F4] px-5 h-[47px] w-full placeholder:text-[#585858]"
            />
          </div>
          <button
            type="submit"
            className="bg-[#1D1D1B] cursor-pointer text-white uppercase rounded-full h-[47px] w-full flex items-center justify-center  font-semibold text-base "
          >
            LOG IN
          </button>
        </form>
      </div>
    </div>
  );
}
