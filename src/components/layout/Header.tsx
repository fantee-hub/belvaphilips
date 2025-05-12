"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import { usePathname, useRouter } from "next/navigation";

import GetStartedModal from "../getStartedModal";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { createClient } from "@supabase/supabase-js";
import { data } from "framer-motion/client";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const pathname = usePathname();
  const router = useRouter();

  const specialPaths = ["/team", "/blog", "/contact"];

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const checkAuth = async () => {
    // Check Supabase user session
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    setIsUserAuthenticated(!!user);
    setUserEmail(user?.email || null);
  };

  useEffect(() => {
    checkAuth();

    // Listen for Supabase auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      checkAuth();
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    console.log("Header: Pathname changed, re-checking auth");
    checkAuth();
  }, [pathname]);

  const handleUserLogout = async () => {
    await supabase.auth.signOut();
    setIsUserAuthenticated(false);
    setUserEmail(null);
    router.push("/signin");
  };

  return (
    <header className="w-full bg-white fixed left-0 right-0 z-[20] lg:py-[30.63px] py-6 lg:border-b lg:border-[#E0E0E0] max-w-[1800px] mx-auto">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-[3.68px] hidden lg:flex"
        >
          <Image
            src={"/assets/images/belvaphilips.svg"}
            width={40.18}
            height={30.74}
            alt="belvaphilips imagery"
          />
          <span
            className={`font-logo text-[23.29px] flex items-center gap-[2.45px]`}
          >
            <span className={`font-black`}>BELVAPHILIPS</span>
            <span className="font-light ">IMAGERY</span>
          </span>
        </Link>
        {/* Mobile Logo */}
        <Link
          href="/"
          className="flex items-center gap-[3.68px] block lg:hidden"
        >
          <Image
            src={"/assets/images/belvaphilips.svg"}
            width={30.92}
            height={23.65}
            alt="belvaphilips imagery"
          />
          <span
            className={`font-logo text-[17.92px] flex items-center gap-[2.45px]`}
          >
            <span className={`font-black  `}>BELVAPHILIPS</span>
            <span className="font-light ">IMAGERY</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex space-x-10 text-sm uppercase">
          <Link
            href="/"
            className={`font-medium hover:text-gray-600 ${
              pathname === "/" ? "text-[#1D1D1B] " : "text-[#6E6E6E]"
            }`}
          >
            Home
          </Link>
          <Link
            href="/portfolio"
            className={`font-medium hover:text-gray-600 ${
              pathname.startsWith("/portfolio")
                ? "text-[#1D1D1B] "
                : "text-[#6E6E6E]"
            }`}
          >
            Portfolio
          </Link>
          <Link
            href="/how-it-works"
            className={`font-medium hover:text-gray-600 ${
              pathname === "/how-it-works"
                ? "text-[#1D1D1B] "
                : "text-[#6E6E6E]"
            }`}
          >
            How it works
          </Link>
          <Link
            href="/pricing"
            className={`font-medium hover:text-gray-600 ${
              pathname === "/pricing" ? "text-[#1D1D1B] " : "text-[#6E6E6E]"
            }`}
          >
            Pricing
          </Link>

          <HoverCard openDelay={0} closeDelay={200}>
            <HoverCardTrigger asChild>
              <button
                className={`font-medium cursor-pointer hover:text-[#1D1D1B] uppercase flex items-center ${
                  specialPaths.includes(pathname)
                    ? "text-[#1D1D1B]"
                    : "text-[#6E6E6E]"
                }`}
              >
                More
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
            </HoverCardTrigger>
            <HoverCardContent
              className="w-[353px] p-0 rounded-3xl shadow-lg border-[0.5px] border-[#C9C9C9]"
              sideOffset={20}
              alignOffset={-50}
              side="bottom"
              align="start"
            >
              <div className="p-5">
                {/* Team Section */}
                <Link
                  href="/team"
                  className="flex items-center border-b pb-[20px] border-gray-200 group mb-5"
                >
                  <div className="mr-4 h-[43px] w-[46px] overflow-hidden">
                    <Image
                      src="/assets/images/team-thumbnail.png"
                      alt="Team"
                      width={46}
                      height={43}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-center">
                    <div className="">
                      <h3 className="text-sm font-medium mb-1 text-[#1D1D1B]">
                        TEAM
                      </h3>
                      <p className="text-[#787878] text-xs">
                        Meet the passionate individuals behind our brand.
                      </p>
                    </div>

                    <div>
                      {" "}
                      <ChevronRight className="h-6 w-6 text-gray-400 group-hover:text-black transition-colors" />
                    </div>
                  </div>
                </Link>

                {/* Blog Section */}
                <Link
                  href="/blog"
                  className="flex items-center border-b pb-5 border-gray-200 group"
                >
                  <div className="mr-4 h-[43px] w-[46px] overflow-hidden">
                    <Image
                      src="/assets/images/blog-thumbnail.png"
                      alt="Blog"
                      width={46}
                      height={43}
                      className="object-cover"
                    />
                  </div>
                  <div className=" flex items-center ">
                    <div>
                      <h3 className="text-sm font-semibold mb-1 text-[#1D1D1B]">
                        BLOG
                      </h3>
                      <p className="text-[#787878] text-xs">
                        Insights, updates, and inspiration just for you.
                      </p>
                    </div>
                    <div>
                      <ChevronRight className="h-6 w-6 text-gray-400 group-hover:text-black transition-colors" />
                    </div>
                  </div>
                </Link>

                {/* Contact Us Section */}
                <Link href="/contact" className="flex items-center py-5 group">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium mb-1 text-[#1D1D1B]">
                      CONTACT US
                    </h3>
                    <p className="text-[#787878] text-xs">
                      Have questions? We're here to help!
                    </p>
                  </div>
                  <ChevronRight className="h-6 w-6 text-gray-400 group-hover:text-black transition-colors" />
                </Link>
              </div>
            </HoverCardContent>
          </HoverCard>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex space-x-3 items-center">
          {isUserAuthenticated ? (
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.964 0a9 9 0 10-11.964 0m11.964 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-sm text-gray-600 truncate max-w-[120px]">
                {userEmail}
              </span>
              <button
                onClick={handleUserLogout}
                className="w-[84px] h-[38px] flex items-center justify-center rounded-full bg-[#EBEBEB] uppercase text-sm font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/signin"
              className="w-[84px] h-[38px] flex items-center justify-center rounded-full bg-[#EBEBEB] uppercase text-sm font-medium"
            >
              LOGIN
            </Link>
          )}

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-[144px] h-[38px] flex items-center cursor-pointer justify-center bg-[#1D1D1B] text-white rounded-full uppercase text-sm font-semibold"
          >
            GET STARTED
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {/* Hamburger Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="lg:hidden bg-white pt-8 pb-1"
        >
          <div className="container mx-auto px-5 flex flex-col space-y-8">
            <Link
              href="/"
              className={`font-medium hover:text-gray-600 text-[22px] uppercase ${
                pathname === "/" ? "text-[#1D1D1B] " : "text-[#6E6E6E]"
              }`}
            >
              Home
            </Link>
            <Link
              href="/portfolio"
              className={`font-medium hover:text-gray-600 text-[22px] uppercase ${
                pathname.startsWith("/portfolio")
                  ? "text-[#1D1D1B] "
                  : "text-[#6E6E6E]"
              }`}
            >
              Portfolio
            </Link>
            <Link
              href="/how-it-works"
              className={`font-medium hover:text-gray-600 text-[22px] uppercase ${
                pathname === "/how-it-works"
                  ? "text-[#1D1D1B] "
                  : "text-[#6E6E6E]"
              }`}
            >
              How it works
            </Link>
            <Link
              href="/pricing"
              className={`font-medium hover:text-gray-600 text-[22px] uppercase ${
                pathname === "/pricing" ? "text-[#1D1D1B] " : "text-[#6E6E6E]"
              }`}
            >
              Pricing
            </Link>
            <Link
              href="/team"
              className={`font-medium hover:text-gray-600 uppercase text-[22px]  ${
                pathname === "/team" ? "text-[#1D1D1B] " : "text-[#6E6E6E]"
              }`}
            >
              Team
            </Link>
            <Link
              href="/blog"
              className={`font-medium hover:text-gray-600 uppercase text-[22px]  ${
                pathname === "/blog" ? "text-[#1D1D1B] " : "text-[#6E6E6E]"
              }`}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className={`font-medium hover:text-gray-600 uppercase text-[22px]  ${
                pathname === "/contact" ? "text-[#1D1D1B] " : "text-[#6E6E6E]"
              }`}
            >
              Contact
            </Link>
            <div className="flex flex-col space-y-3">
              {isUserAuthenticated ? (
                <button
                  onClick={handleUserLogout}
                  className="px-4 py-2 border border-gray-300 rounded-md uppercase"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/signin"
                  className=" rounded-full font-medium text-sm uppercase w-full h-[40px] flex items-center justify-center text-[#1D1D1B] bg-[#EBEBEB]"
                >
                  sign up
                </Link>
              )}
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsModalOpen(true);
                }}
                className=" bg-[#1D1D1B] text-white rounded-full uppercase w-full h-[40px] flex items-center justify-center text-sm font-semibold"
              >
                GET STARTED
              </button>
            </div>
          </div>
        </motion.div>
      )}
      <GetStartedModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </header>
  );
};

export default Header;
