"use client";

import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { getOrders } from "@/lib/api";
import Link from "next/link";
import setAuthToken from "@/lib/api/setAuthToken";
import Spinner from "@/components/ui/Spinner";
import ClientGalleriesModal from "@/components/admin/client-galleries/ClientGalleriesModal";

interface OrdersCount {
  active_orders: number;
  completed_orders: number;
  pending_orders: number;
}

export default function Admin() {
  const [ordersCount, setOrdersCount] = useState<OrdersCount | null>(null);
  const [isFetchingOrders, setIsFetchingOrders] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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
    <div className="md:pt-[100px] py-[70px] pb-[100px] ">
      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-[60px] mt-8 md:container px-4  md:mx-auto pt-5 max-w-[272px]">
        <div className="text-left">
          <p className="text-[#787878] font-semibold uppercase text-[22px]">
            Pending Requests
          </p>
          <div className="flex justify-between items-center">
            <p
              className={`text-[44px] ${
                ordersCount?.pending_orders && ordersCount.pending_orders > 0
                  ? "font-semibold text-[#C49524]"
                  : "text-[44px] font-bold"
              } `}
            >
              {ordersCount?.pending_orders}
            </p>
            <Link href={"/admin/orders?status=pending"}>
              <button className="cursor-pointer mt-2 w-[80px] h-[37px] flex items-center justify-center border border-[#1D1D1B] rounded-full text-sm hover:bg-gray-100">
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
            <p
              className={`text-[44px] ${
                ordersCount?.active_orders && ordersCount.active_orders > 0
                  ? "font-semibold text-[#C49524]"
                  : "text-[44px] font-bold"
              } `}
            >
              {ordersCount?.active_orders}
            </p>
            <Link href={"/admin/orders?status=active"}>
              <button className="cursor-pointer mt-2 w-[80px] h-[37px] flex items-center justify-center border border-[#1D1D1B] rounded-full text-sm hover:bg-gray-100">
                VIEW
              </button>
            </Link>
          </div>
        </div>

        <div className="text-left">
          <p className="text-[#787878] font-semibold uppercase text-[22px] ">
            Completed Projects
          </p>
          <div className="flex justify-between items-center">
            <p
              className={`text-[44px] ${
                ordersCount?.completed_orders &&
                ordersCount.completed_orders > 0
                  ? "font-semibold text-[#C49524]"
                  : "text-[44px] font-bold"
              } `}
            >
              {ordersCount?.completed_orders}
            </p>
            <Link href={"/admin/orders?status=completed"}>
              <button className="cursor-pointer mt-2 w-[80px] h-[37px] flex items-center justify-center border border-[#1D1D1B] rounded-full text-sm hover:bg-gray-100">
                VIEW
              </button>
            </Link>
          </div>
        </div>

        <div className="text-left">
          <p className="text-[#787878] font-semibold uppercase text-[22px] mb-5">
            Blog
          </p>
          <div className="items-end ">
            <div className="flex items-center md:space-x-2 justify-between md:justify-start">
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

        <div className="text-left">
          <p className="text-[#787878] font-semibold uppercase text-[22px] mb-5">
            CLIENT GALLERIES
          </p>
          <div className="items-end ">
            <div className="flex items-center md:space-x-2 justify-between md:justify-start">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-[80px] h-[37px] uppercase flex items-center justify-center  bg-[#1D1D1B] text-[13px] font-semibold text-white rounded-full hover:bg-gray-800 cursor-pointer"
              >
                Create
              </button>

              <Link href={"/admin/client-galleries"}>
                <button className="w-[89px] h-[37px] flex items-center justify-center text-[13px] font-semibold text-[#1D1D1B]  border border-[#1D1D1B] rounded-full  hover:bg-gray-100 cursor-pointer">
                  VIEW ALL
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Modal for Client Galleries */}
      <ClientGalleriesModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
}
