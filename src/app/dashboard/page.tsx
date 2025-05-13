"use client";

import React, { useEffect, useState } from "react";

// import OrderDetailsModal from "./OrderDetailsModal";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import RequestTable from "@/components/dashboard/RequestTable";
import Cookies from "universal-cookie";
import setAuthToken from "@/lib/api/setAuthToken";
import { getOrdersByUser } from "@/lib/api";
import { useAppSelector } from "@/lib/redux/hooks";
import Spinner from "@/components/ui/Spinner";

interface Order {
  //   id: string;
  //   created_at: string;
  //   updated_at?: string;
  //   status?: string;
  //   product_name: string;
  //   shoot_type: string;
  //   finish_type: string;
  //   quantity: number;
  //   shots: string[];
  //   details: {
  //     shots?: string[];
  //     [key: string]: any;
  //   };
  //   user_email: string;

  created_at: string;
  updated_at: string;
  product_description: string;
  id: string;
  user_id: string;
  user_email: string;
  user_membership_status: string;
  product_name: string;
  shoot_type: string;
  finish_type: string;
  delivery_speed: string;
  status: string;
  membership_type: string;
  details: any;
  shots: string[];
  quantity: number;
}

interface UserDashboardProps {
  orders: Order[];
}
// const orders = [
//   {
//     id: "SEY1001",
//     created_at: "2025-05-04T12:00:00Z",
//     updated_at: "2025-05-04T12:00:00Z",
//     status: "quote_received",
//   },
//   {
//     id: "SEY1002",
//     created_at: "2025-05-03T10:00:00Z",
//     updated_at: "2025-05-03T10:00:00Z",
//     status: "awaiting_confirmation",
//   },
// ];
const UserDashboard: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const cookies = new Cookies();
  const { userId, email } = useAppSelector((state) => state.user);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const token = cookies.get("user_token");

      if (token) {
        setAuthToken(token);
      }

      try {
        if (userId) {
          const { data } = await getOrdersByUser(userId);
          const responseData = data.data as any;

          setOrders(responseData || []);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <>
      <Header />
      <div className="container mx-auto pt-[140px]">
        <div>
          <DashboardHeader />
          <div className="w-[146px] h-[40px] flex items-center justify-center rounded-full bg-[#EEEEEE] uppercase font-semibold text-[22px] text-[#1D1D1B]">
            Requests
          </div>
          <div className="bg-white p-6 mt-8 max-w-[852px]">
            <RequestTable orders={orders} isLoading={loading} />
          </div>
          {/* <OrderDetailsModal
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
          /> */}
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
