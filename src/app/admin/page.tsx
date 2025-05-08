"use client";

import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { getOrders } from "@/lib/api";
import Link from "next/link";
import setAuthToken from "@/lib/api/setAuthToken";
import Spinner from "@/components/ui/Spinner";

interface OrdersCount {
  active_orders: number;
  completed_orders: number;
  pending_orders: number;
}

export default function Admin() {
  const [ordersCount, setOrdersCount] = useState<OrdersCount | null>(null);
  const [isFetchingOrders, setIsFetchingOrders] = useState<boolean>(false);
  const cookies = new Cookies();

  useEffect(() => {
    const fetchOrders = async () => {
      setIsFetchingOrders(true);
      const token = cookies.get("admin_token");

      if (token) {
        setAuthToken(token);
      }
      try {
        const { data } = await getOrders(1, 10);
        setOrdersCount(data.data.orders_count as OrdersCount);
        console.log("Orders:", data.data.orders_count);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsFetchingOrders(false);
      }
    };
    fetchOrders();
  }, []);

  if (isFetchingOrders) {
    return (
      <div className="container mx-auto h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="pt-[100px]">
      <div className="grid grid-cols-4  gap-[60px] mt-8 container  px-4  mx-auto pt-5 ">
        <div className="text-left">
          <p className="text-[#787878] font-semibold uppercase text-[22px]">
            Pending Requests
          </p>
          <div className="flex justify-between items-center">
            <p className="text-[44px] font-semibold text-[#C49524]">
              {ordersCount?.pending_orders}
            </p>
            <Link href={"/admin/orders?status=pending"}>
              <button className="mt-2 w-[80px] h-[37px] flex items-center justify-center border border-[#1D1D1B] rounded-full text-sm hover:bg-gray-100">
                VIEW
              </button>
            </Link>
          </div>
        </div>

        <div className="text-left">
          <p className="text-[#787878] font-semibold uppercase text-[22px]">
            Active Projects
          </p>
          <div className="flex justify-between items-center">
            <p className="text-[44px] font-bold">
              {ordersCount?.active_orders}
            </p>
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
            <p className="text-[44px] font-bold">
              {ordersCount?.completed_orders}
            </p>
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
                <button className="w-[80px] h-[37px] flex items-center justify-center  bg-[#1D1D1B] text-[13px] font-semibold text-white rounded-full hover:bg-gray-800 cursor-pointer">
                  POST
                </button>
              </Link>
              <Link href={"/admin/blog/all-posts"}>
                <button className="w-[89px] h-[37px] flex items-center justify-center text-[13px] font-semibold text-[#1D1D1B]  border border-[#1D1D1B] rounded-full  hover:bg-gray-100 cursor-pointer">
                  VIEW ALL
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
