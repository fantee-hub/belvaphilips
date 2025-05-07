import { portfolioItems } from "@/lib/mockData";
import Image from "next/image";
import Link from "next/link";

const PortfolioItem = ({ item }: { item: (typeof portfolioItems)[0] }) => {
  return (
    <div className="group relative overflow-hidden bg-white ">
      <div className="aspect-square relative overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 transform border-b border-[#C9C9C9] translate-y-full bg-[#1D1D1B] text-white transition-transform duration-300 ease-out group-hover:translate-y-0">
        <Link href={`/portfolio/finalize?id=${item.id}`}>
          <p className="text-[24px] font-medium py-[17px] px-6 flex items-center justify-between">
            I WANT THIS LOOK
            <span>
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.1998 5.11245L22.5123 12.4249C22.5879 12.5004 22.6478 12.59 22.6887 12.6887C22.7296 12.7873 22.7506 12.893 22.7506 12.9998C22.7506 13.1066 22.7296 13.2123 22.6887 13.3109C22.6478 13.4096 22.5879 13.4992 22.5123 13.5746L15.1998 20.8871C15.0474 21.0396 14.8406 21.1252 14.625 21.1252C14.4094 21.1252 14.2026 21.0396 14.0502 20.8871C13.8977 20.7347 13.812 20.5279 13.812 20.3123C13.812 20.0967 13.8977 19.8899 14.0502 19.7374L19.9763 13.8123L4.0625 13.8123C3.84701 13.8123 3.64035 13.7267 3.48798 13.5743C3.3356 13.4219 3.25 13.2153 3.25 12.9998C3.25 12.7843 3.3356 12.5776 3.48798 12.4253C3.64035 12.2729 3.84701 12.1873 4.0625 12.1873L19.9763 12.1873L14.0502 6.26214C13.8977 6.10968 13.812 5.9029 13.812 5.68729C13.812 5.47168 13.8977 5.26491 14.0502 5.11245C14.2026 4.95999 14.4094 4.87434 14.625 4.87434C14.8406 4.87434 15.0474 4.95999 15.1998 5.11245Z"
                  fill="white"
                />
              </svg>
            </span>
          </p>
        </Link>
        {/* <div className="px-5 py-3">
          <div className="flex items-center text-gray-500 mt-1">
            <h3 className="text-sm font-medium text-black">{item.title}</h3>
            <span className="mx-1.5 text-gray-400">·</span>
            <div>
              {item.tags.map((tag, idx) => (
                <span key={idx} className="inline-flex items-center text-sm">
                  {idx > 0 && <span className="mx-1.5 text-gray-400">·</span>}
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <p className="mt-4 text-base font-medium ">{item.price}</p>
        </div> */}
      </div>
    </div>
  );
};

export default PortfolioItem;
