"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Cookies from "universal-cookie";
import setAuthToken from "@/lib/api/setAuthToken";
import { getOrdersByStatus } from "@/lib/api";

import OrdersPagination from "./OrdersPagination";
import Spinner from "@/components/ui/Spinner";
import OrdersTable from "./OrdersTable";

interface Order {
  id: string;
  created_at: string;
  updated_at: string;
  status?: string;
  product_name: string;
  shoot_type: string;
  finish_type: string;
  quantity: number;
  shots: string[];
  details: {
    shots?: string[];
    [key: string]: any;
  };
  user_email: string;
}

interface OrdersResponse {
  orders: Order[];
  orders_count: {
    active_orders: number;
    completed_orders: number;
    pending_orders: number;
  };
  total_pages: number;
}

const OrdersContent = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "pending";
  const pageParam = searchParams.get("page") || "1";
  const currentPage = parseInt(pageParam, 10);

  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersCount, setOrdersCount] = useState({
    active_orders: 0,
    completed_orders: 0,
    pending_orders: 0,
  });
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const cookies = new Cookies();
  const limit = 10;

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const token = cookies.get("admin_token");

      if (token) {
        setAuthToken(token);
      }

      try {
        const { data } = await getOrdersByStatus(currentPage, limit, status);
        const responseData = data.data as OrdersResponse;

        setOrders(responseData.orders || []);
        setOrdersCount(
          responseData.orders_count || {
            active_orders: 0,
            completed_orders: 0,
            pending_orders: 0,
          }
        );
        setTotalPages(responseData.total_pages || 1);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [status, currentPage]);

  if (loading) {
    return (
      <div className="flex justify-center py-40 max-w-[891px]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="overflow-auto">
      <OrdersTable orders={orders} status={status} />
      <div className="max-w-[891px] ">
        <OrdersPagination
          currentPage={currentPage}
          totalPages={totalPages}
          status={status}
        />
      </div>
    </div>
  );
};

export default OrdersContent;
