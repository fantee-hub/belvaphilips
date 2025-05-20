"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";

const Header = () => {
  const cookies = new Cookies();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const adminToken = cookies.get("admin_token");
      setIsAuthenticated(!!adminToken);
    };

    checkAuth();

    const interval = setInterval(checkAuth, 30 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    cookies.remove("admin_token", { path: "/" });
    setIsAuthenticated(false);
    router.push("/admin/login");
  };
  return (
    <header className="w-full bg-white fixed left-0 right-0 z-[10] md:py-[30.63px] py-4 border-b-[0.5px] border-[#E0E0E0] md:max-w-[1800px] mx-auto">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/admin" className="flex items-center gap-[3.68px]">
          <span className="hidden md:block">
            <Image
              src={"/assets/images/belvaphilips.svg"}
              width={34.83}
              height={26.65}
              alt="belvaphilips imagery"
            />
          </span>
          <span className="md:hidden block">
            <Image
              src={"/assets/images/belvaphilips.svg"}
              width={23.84}
              height={23.65}
              alt="belvaphilips imagery"
            />
          </span>

          <span
            className={`font-logo md:text-[20.19px] text-[17.92px] flex items-center gap-[2.45px]`}
          >
            <span className={`font-black  `}>BELVAPHILIPS</span>
            <span className="font-light ">IMAGERY</span>
          </span>
        </Link>

        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            {/* Profile Icon */}
            <div className="w-[38px] h-[38px] flex items-center justify-center rounded-full bg-[#EBEBEB]">
              <Image
                src={"/assets/images/user-avatar.svg"}
                width={19.5}
                height={19.5}
                alt="Profile"
              />
            </div>
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-800 text-sm font-medium cursor-pointer"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            href="/admin/login"
            className="text-gray-600 hover:text-gray-800 text-sm font-medium cursor-pointer"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
