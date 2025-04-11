"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import { usePathname } from "next/navigation";

import GetStartedModal from "../getStartedModal";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pathname = usePathname();

  const specialPaths = ["/team", "/blog", "/contact"];

  return (
    <header className="w-full bg-white fixed left-0 right-0 z-[10] py-[30.63px] border-b border-[#E0E0E0] max-w-[1800px] mx-auto">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-[3.68px]">
          <Image
            src={"/assets/images/belvaphilips.svg"}
            width={40.18}
            height={30.74}
            alt="belvaphilips imagery"
          />
          <span
            className={`font-logo text-[23.29px] flex items-center gap-[2.45px]`}
          >
            <span className={`font-black  `}>BELVAPHILIPS</span>
            <span className="font-light ">IMAGERY</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex space-x-10 text-sm uppercase">
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
        <div className="hidden md:flex space-x-3">
          <Link
            href="/login"
            className="w-[84px] h-[38px] flex items-center justify-center rounded-full bg-[#EBEBEB] uppercase text-sm font-medium"
          >
            LOGIN
          </Link>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-[144px] h-[38px] flex items-center cursor-pointer justify-center bg-[#1D1D1B] text-white rounded-full uppercase text-sm font-semibold"
          >
            GET STARTED
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
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
          className="md:hidden bg-white py-4"
        >
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Link href="/" className="font-medium hover:text-gray-600">
              Home
            </Link>
            <Link href="/about" className="font-medium hover:text-gray-600">
              About
            </Link>
            <Link href="/services" className="font-medium hover:text-gray-600">
              Services
            </Link>
            <Link href="/work" className="font-medium hover:text-gray-600">
              Work
            </Link>
            <Link href="/blog" className="font-medium hover:text-gray-600">
              Blog
            </Link>
            <div className="flex space-x-2 pt-2">
              <Link
                href="/login"
                className="px-4 py-2 border border-gray-300 rounded-md"
              >
                LOGIN
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-black text-white rounded-md"
              >
                SIGN UP
              </Link>
            </div>
          </div>
        </motion.div>
      )}
      <GetStartedModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </header>
  );
};

export default Header;
