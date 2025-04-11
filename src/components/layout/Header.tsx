"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Karla } from "next/font/google";
import { usePathname } from "next/navigation";
import { PiCaretDown } from "react-icons/pi";
import GetStartedModal from "../getStartedModal";

const karla = Karla({ subsets: ["latin"] });

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();

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
          <Link
            href="#"
            className={`font-medium hover:text-gray-600 ${
              pathname === "/#" ? "text-[#1D1D1B] " : "text-[#6E6E6E]"
            }`}
          >
            <span className="flex items-center gap-[3.69px]">
              More
              <span>
                <PiCaretDown />
              </span>
            </span>
          </Link>
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
