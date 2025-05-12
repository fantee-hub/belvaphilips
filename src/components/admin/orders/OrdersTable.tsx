"use client";

import React, { useState } from "react";
import StatusUpdateDropdown from "./StatusUpdateDropdown";
import { PiCalendarDots } from "react-icons/pi";
import OrderDetailsModal from "./OrderDetailsModal";

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

interface OrdersTableProps {
  orders: Order[];
  status: string;
}

const OrdersTable: React.FC<OrdersTableProps> = ({
  orders: initialOrders,
  status,
}) => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options).toUpperCase();
  };

  // Define the status workflow
  const statusWorkflow = [
    "mark_as_paid",
    "mark_received",
    "send_for_review",
    "mark_revisions",
    "mark_approved",
    "mark_returned",
    "mark_completed",
  ];

  const getNextStatus = (currentStatus: string | undefined) => {
    const currentIndex = statusWorkflow.indexOf(currentStatus || "");
    return statusWorkflow[currentIndex + 1] || currentStatus || "pending";
  };

  const handleStatusUpdated = (orderId: string, updatedOrder: Order) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              ...updatedOrder,
              status: getNextStatus(updatedOrder.status),
            }
          : order
      )
    );
  };

  const sortedOrders = [...orders].sort((a, b) => {
    const dateA = new Date(a.updated_at || a.created_at).getTime();
    const dateB = new Date(b.updated_at || b.created_at).getTime();
    return dateB - dateA;
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-[891px] divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-base font-medium text-[#787878] uppercase tracking-wider">
              REQUEST ID
            </th>
            <th className="px-6 py-3 text-left text-base font-medium text-[#787878] uppercase tracking-wider">
              DATE CREATED
            </th>
            <th className="px-6 py-3 text-left text-base font-medium text-[#787878] uppercase tracking-wider">
              ACTION
            </th>
            <th className="px-6 py-3 text-left text-base font-medium text-[#787878] uppercase tracking-wider">
              STATUS
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedOrders.length > 0 ? (
            sortedOrders.map((order) => {
              console.log(
                `Order ${order.id} status:`,
                order.status,
                `updated_at:`,
                order.updated_at
              ); // Debug log
              return (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-base font-semibold text-[#1D1D1B]">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-[#1D1D1B] font-semibold">
                    <span className="flex items-center gap-1">
                      <PiCalendarDots className="text-lg" />
                      {formatDate(order.created_at)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500">
                    <button
                      className="bg-black text-white px-4 py-2 rounded-full text-sm font-semibold uppercase cursor-pointer"
                      onClick={() => setSelectedOrder(order)}
                    >
                      VIEW DETAILS
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <StatusUpdateDropdown
                      orderId={order.id}
                      currentStatus={order.status || "pending"}
                      onStatusUpdated={(updatedOrder) =>
                        handleStatusUpdated(order.id, updatedOrder)
                      }
                    />
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={4}
                className="px-6 py-4 text-center text-sm text-gray-500"
              >
                No {status} orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
};

export default OrdersTable;
