"use client";

import React, { useState } from "react";
import StatusUpdateDropdown from "./StatusUpdateDropdown";
import { PiCalendarDots } from "react-icons/pi";
import OrderDetailsModal from "./OrderDetailsModal";

interface Order {
  id: string;
  order_name: string;
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
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5; // Adjust as needed for mobile pagination

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options).toUpperCase();
  };

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

  // Pagination logic for mobile
  const totalPages = Math.ceil(sortedOrders.length / ordersPerPage);
  const paginatedOrders = sortedOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
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
              sortedOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-base font-semibold text-[#1D1D1B]">
                    {order.order_name}
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
      </div>

      {/* Mobile View */}
      <div className="block md:hidden">
        {paginatedOrders.length > 0 ? (
          <div className="space-y-10">
            {paginatedOrders.map((order) => (
              <div key={order.id} className="">
                <div className="space-y-7">
                  {/* Request ID */}
                  <div>
                    <p className="text-xs font-medium text-[#787878] uppercase">
                      REQUEST ID
                    </p>
                    <p className="text-base font-semibold text-[#1D1D1B]">
                      {order.order_name}
                    </p>
                  </div>

                  {/* Date Created */}
                  <div>
                    <p className="text-xs font-medium text-[#787878] uppercase">
                      DATE CREATED
                    </p>
                    <p className="text-base font-semibold text-[#1D1D1B] flex items-center gap-1">
                      <PiCalendarDots className="text-lg" />
                      {formatDate(order.created_at)}
                    </p>
                  </div>

                  {/* Action */}
                  <div>
                    <p className="text-xs font-medium text-[#787878] uppercase">
                      ACTION
                    </p>
                    <button
                      className="mt-1 bg-black text-white px-4 py-2 rounded-full text-sm font-semibold uppercase cursor-pointer"
                      onClick={() => setSelectedOrder(order)}
                    >
                      VIEW DETAILS
                    </button>
                  </div>

                  {/* Status */}
                  <div>
                    <p className="text-xs font-medium text-[#787878] uppercase">
                      STATUS
                    </p>
                    <div className="mt-1">
                      <StatusUpdateDropdown
                        orderId={order.id}
                        currentStatus={order.status || "pending"}
                        onStatusUpdated={(updatedOrder) =>
                          handleStatusUpdated(order.id, updatedOrder)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-sm text-gray-500 py-4">
            No {status} orders found
          </div>
        )}
      </div>

      <OrderDetailsModal
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
};

export default OrdersTable;
