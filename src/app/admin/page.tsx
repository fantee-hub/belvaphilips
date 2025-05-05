"use client";

import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function Admin() {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const cookies = new Cookies();
  const router = useRouter();

  return (
    <div className="pt-[100px]">
      <div className="grid grid-cols-4  gap-[60px] mt-8 container  px-4  mx-auto pt-5 ">
        <div className="text-left">
          <p className="text-[#787878] font-semibold uppercase text-[22px]">
            Pending Requests
          </p>
          <div className="flex justify-between items-center">
            <p className="text-[44px] font-semibold text-[#C49524]">1</p>
            <button className="mt-2 w-[80px] h-[37px] flex items-center justify-center border border-[#1D1D1B] rounded-full text-sm hover:bg-gray-100">
              VIEW
            </button>
          </div>
        </div>

        <div className="text-left">
          <p className="text-[#787878] font-semibold uppercase text-[22px]">
            Active Projects
          </p>
          <div className="flex justify-between items-center">
            <p className="text-[44px] font-bold">0</p>
            <button className="mt-2 w-[80px] h-[37px] flex items-center justify-center border border-[#1D1D1B] rounded-full text-sm hover:bg-gray-100">
              VIEW
            </button>
          </div>
        </div>

        <div className="text-left">
          <p className="text-[#787878] font-semibold uppercase text-[22px] ">
            Completed Projects
          </p>
          <div className="flex justify-between items-center">
            <p className="text-[44px] font-bold">5</p>
            <button className="mt-2 w-[80px] h-[37px] flex items-center justify-center border border-[#1D1D1B] rounded-full text-sm hover:bg-gray-100">
              VIEW
            </button>
          </div>
        </div>

        <div className="text-left">
          <p className="text-[#787878] font-semibold uppercase text-[22px] mb-5">
            Blog
          </p>
          <div className="items-end ">
            <div className="flex items-center space-x-2">
              <Link href={"/admin/blog/post"}>
                <button className="w-[80px] h-[37px] flex items-center justify-center  bg-[#1D1D1B] text-[13px] font-semibold text-white rounded-full hover:bg-gray-800">
                  POST
                </button>
              </Link>
              <button className="w-[89px] h-[37px] flex items-center justify-center text-[13px] font-semibold text-[#1D1D1B]  border border-[#1D1D1B] rounded-full  hover:bg-gray-100 cursor-pointer">
                VIEW ALL
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
