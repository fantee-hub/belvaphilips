import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full bg-white fixed left-0 right-0 z-[10] py-[30.63px] border-b-[0.5px] border-[#E0E0E0] max-w-[1800px] mx-auto">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-[3.68px]">
          <Image
            src={"/assets/images/belvaphilips.svg"}
            width={34.83}
            height={26.65}
            alt="belvaphilips imagery"
          />
          <span
            className={`font-logo text-[20.19px] flex items-center gap-[2.45px]`}
          >
            <span className={`font-black  `}>BELVAPHILIPS</span>
            <span className="font-light ">IMAGERY</span>
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
