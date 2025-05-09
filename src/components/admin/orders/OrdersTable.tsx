"use client";

import React, { useState } from "react";
import StatusUpdateDropdown from "./StatusUpdateDropdown";
import { PiCalendarDots } from "react-icons/pi";
import OrderDetailsModal from "./OrderDetailsModal";

interface Order {
  id: string;
  created_at: string;
  status: string;
}

interface OrdersTableProps {
  orders: Order[];
  status: string;
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orders, status }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options).toUpperCase();
  };

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
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
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap text-base font-semibold text-[#1D1D1B]">
                  {order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-base text-[#1D1D1B] font-semibold ">
                  <span className="flex items-center gap-1">
                    {" "}
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
                    currentStatus={status}
                  />
                </td>
              </tr>
            ))
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
