"use client";

import React from "react";
import { PiCalendarDots } from "react-icons/pi";
import StatusBadge from "./StatusBadge";
import Spinner from "../ui/Spinner";

interface Order {
  id: string;
  created_at: string;
  updated_at?: string;
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

interface RequestTableProps {
  orders: any;
  isLoading: boolean;
}

const RequestTable: React.FC<RequestTableProps> = ({ orders, isLoading }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options).toUpperCase();
  };

  // Define status display names and colors
  const statusStyles: { [key: string]: { name: string; color: string } } = {
    quote_received: { name: "Quote Received", color: "#22C55E" }, // Green
    awaiting_confirmation: { name: "Awaiting Confirmation", color: "#FACC15" }, // Yellow
    confirmed_awaiting_product: {
      name: "Confirmed & Awaiting Product",
      color: "#60A5FA",
    }, // Light Blue
    product_received_shooting: {
      name: "Product Received & Shooting in Progress",
      color: "#22C55E",
    }, // Green
    awaiting_review: { name: "Awaiting Review", color: "#A855F7" }, // Purple
    final_approval: { name: "Final Approval Received", color: "#14B8A6" }, // Teal
    product_returned: { name: "Product Returned", color: "#6B7280" }, // Gray
    project_completed: { name: "Project Completed", color: "#15803D" }, // Dark Green
  };

  // Get the display name and color for a status
  const getStatusDisplay = (status: string | undefined) => {
    const normalizedStatus = (status || "quote_received")
      .toLowerCase()
      .replace(/ /g, "_");
    return (
      statusStyles[normalizedStatus] || {
        name: normalizedStatus,
        color: "#6B7280",
      }
    ); // Default to gray if status not found
  };

  // Sort orders by updated_at (newest first)
  const sortedOrders = [...orders].sort((a, b) => {
    const dateA = new Date(a.updated_at || a.created_at).getTime();
    const dateB = new Date(b.updated_at || b.created_at).getTime();
    return dateB - dateA; // Newest first
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-40 max-w-[891px]">
        <Spinner size="lg" />
      </div>
    );
  }
  return (
    <div>
      <table className="w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-base font-medium text-[#787878] uppercase tracking-wider">
              REQUEST ID
            </th>
            <th className="px-6 py-3 text-left text-base font-medium text-[#787878] uppercase tracking-wider">
              DATE CREATED
            </th>
            {/* <th className="px-6 py-3 text-left text-base font-medium text-[#787878] uppercase tracking-wider">
              ACTION
            </th> */}
            <th className="px-6 py-3 text-left text-base font-medium text-[#787878] uppercase tracking-wider">
              STATUS
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedOrders.length > 0 ? (
            sortedOrders.map((order) => {
              const { name: statusName, color: statusColor } = getStatusDisplay(
                order.status
              );
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
                  {/* <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500">
                    <button className="bg-black text-white px-4 py-2 rounded-full text-sm font-semibold uppercase cursor-pointer">
                      VIEW DETAILS
                    </button>
                  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                    <StatusBadge status={order.status} />
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
                No requests found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RequestTable;
