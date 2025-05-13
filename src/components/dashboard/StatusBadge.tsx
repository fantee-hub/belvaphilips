"use client";

import React from "react";

interface StatusBadgeProps {
  status?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusStyles: { [key: string]: { name: string; color: string } } = {
    quote_received: { name: "Quote Received", color: "#22C55E" },
    awaiting_confirmation: { name: "Awaiting Confirmation", color: "#FACC15" },
    confirmed_awaiting_product: {
      name: "Confirmed & Awaiting Product",
      color: "#60A5FA",
    },
    product_received_shooting: {
      name: "Product Received & Shooting in Progress",
      color: "#22C55E",
    },
    awaiting_review: { name: "Awaiting Review", color: "#A855F7" },
    final_approval: { name: "Final Approval Received", color: "#14B8A6" },
    product_returned: { name: "Product Returned", color: "#6B7280" },
    project_completed: { name: "Project Completed", color: "#15803D" },
  };

  const getStatusDisplay = (status: string | undefined) => {
    const normalizedStatus = (status || "quote_received")
      .toLowerCase()
      .replace(/ /g, "_");
    return (
      statusStyles[normalizedStatus] || {
        name: normalizedStatus,
        color: "#6B7280",
      }
    );
  };

  const { name: statusName, color: statusColor } = getStatusDisplay(status);

  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-white"
      style={{ backgroundColor: statusColor }}
    >
      {statusName}
    </span>
  );
};

export default StatusBadge;
