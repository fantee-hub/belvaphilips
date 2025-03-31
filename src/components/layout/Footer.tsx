import Link from "next/link";
import Image from "next/image";
import { CiMapPin } from "react-icons/ci";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Karla } from "next/font/google";

const karla = Karla({ subsets: ["latin"] });

const Footer = () => {
  return (
    <footer className="bg-[#FEC845] py-11 relative overflow-hidden">
      <div className="container mx-auto px-4 pb-[66px]">
        <div className="border-b border-[#00000020]">
          <div className="flex gap-[122px]">
            {/* Company Info */}
            <div className="max-w-[294px] flex flex-col gap-6">
              <div className="flex items-start gap-2">
                <span>
                  <CiMapPin className="text-[#9B7824]" size={22} />
                </span>
                <p className="-mt-1 text-lg font-medium">
                  Belvaphilips Imagery,
                  <br /> No 48, Adedoyin Street, Ogba.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <span>
                    <Image
                      src="/assets/images/Phone.svg"
                      width={22}
                      height={22}
                      alt="Phone"
                    />
                  </span>
                  <p className="text-lg font-medium">08156744356</p>
                </div>
                <div className="flex gap-2">
                  <span>
                    <Image
                      src="/assets/images/Phone.svg"
                      width={22}
                      height={22}
                      alt="Phone"
                    />
                  </span>
                  <p className="text-lg font-medium">09021431336</p>
                </div>
              </div>
              <div className="flex items-center gap-[17.94px]">
                <span className="w-[52.71px] h-[52.71px] flex items-center justify-center border border-black rounded-full">
                  <FaInstagram size={26.91} />
                </span>
                <span className="w-[52.71px] h-[52.71px] flex items-center justify-center border border-black rounded-full">
                  <FaFacebookF size={26.91} />
                </span>
                <span className="w-[52.71px] h-[52.71px] flex items-center justify-center border border-black rounded-full">
                  <FaXTwitter size={26.91} />
                </span>
                <span className="w-[52.71px] h-[52.71px] flex items-center justify-center border border-black rounded-full">
                  <FaLinkedinIn size={26.91} />
                </span>
              </div>
              <div>
                <button className="w-[162px] h-[47px] uppercase flex items-center justify-center bg-[#1D1D1B] rounded-full text-sm font-semibold text-white">
                  get started
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-lg">
              <h4 className="font-semibold mb-4 uppercase text-[#B69035]">
                Company
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/about" className="hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:underline">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:underline">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="hover:underline">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:underline">
                    Team
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-lg">
              <h4 className="font-semibold mb-4 uppercase text-[#B69035]">
                Menu
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/services" className="hover:underline">
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="hover:underline whitespace-nowrap"
                  >
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/faqs" className="hover:underline">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/testimonials" className="hover:underline">
                    Membership
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-lg">
              <h4 className="font-semibold mb-4 uppercase text-[#B69035]">
                Categories
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/blog" className="hover:underline">
                    Clothing
                  </Link>
                </li>
                <li>
                  <Link href="/guides" className="hover:underline">
                    Bags
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:underline">
                    Shoes
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:underline">
                    Beauty
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:underline">
                    Jewelry
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:underline">
                    Drinks
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-lg">
              <h4 className="font-semibold mb-4 uppercase text-[#B69035]">
                Help
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/blog" className="hover:underline">
                    Exclusivity License
                  </Link>
                </li>
                <li>
                  <Link href="/guides" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:underline">
                    Shipping Policy
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:underline">
                    Terms and Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:underline">
                    Product Returns
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pb-4 text-[#B08215]">
            <p>
              © {new Date().getFullYear()} Belvaphilips Imagery. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <div className="flex items-end justify-center translate-y-[38%]">
          <Image
            src={"/assets/images/footer logo.svg"}
            width={199.06}
            height={152.29}
            alt="belvaphilips imagery"
            className="relative bottom-[-20px]"
          />
          <span
            className={`${karla.className} text-[115.38px] flex items-center gap-[2.45px]`}
          >
            <span className="font-black">BELVAPHILIPS</span>
            <span className="font-light">IMAGERY</span>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
