"use client";

import React, { useState } from "react";
import Cookies from "universal-cookie";
import setAuthToken from "@/lib/api/setAuthToken";
// You would need to implement this API function in your lib/api.js file
// import { updateOrderStatus } from "@/lib/api";

interface StatusUpdateDropdownProps {
  orderId: string;
  currentStatus: string;
}

const StatusUpdateDropdown: React.FC<StatusUpdateDropdownProps> = ({
  orderId,
  currentStatus,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const cookies = new Cookies();

  // Status options based on current status
  const getStatusOptions = () => {
    switch (currentStatus) {
      case "pending":
        return [
          {
            id: "mark_as_paid",
            label: "MARK AS PAID",
            description:
              "The client has paid for the quote. Wait for product shipment.",
          },
          {
            id: "mark_as_active",
            label: "MARK AS ACTIVE",
            description: "Move this request to active projects.",
          },
        ];
      case "active":
        return [
          {
            id: "mark_received",
            label: "MARK PRODUCT AS RECEIVED & START SHOOT",
            description: "The product has arrived. Begin the photoshoot.",
          },
          {
            id: "send_for_review",
            label: "SENT IMAGES FOR REVIEW",
            description:
              "The images are ready. Notify the client for approval.",
          },
          {
            id: "mark_revisions",
            label: "MARK AS REVISIONS IN PROGRESS",
            description: "The client requested changes. Start working on them.",
          },
          {
            id: "mark_approved",
            label: "MARK AS APPROVED AND ARRANGE PRODUCT RETURN",
            description:
              "The client approved the final images. Arrange return shipping.",
          },
          {
            id: "mark_returned",
            label: "MARK AS RETURNED",
            description: "The product has been shipped back.",
          },
          {
            id: "mark_completed",
            label: "COMPLETE PROJECT",
            description:
              "The project is finished. No further actions are required.",
          },
        ];
      case "completed":
        // Usually completed projects wouldn't need status changes, but you could add reopen options here
        return [];
      default:
        return [];
    }
  };

  const handleStatusUpdate = async (statusId: string) => {
    setIsUpdating(true);
    setIsOpen(false);

    const token = cookies.get("admin_token");
    if (token) {
      setAuthToken(token);
    }

    try {
      // Replace with your actual update status API function
      // await updateOrderStatus(orderId, statusId);

      // For demonstration purposes, we're just showing a success message
      console.log(`Updated order ${orderId} status to ${statusId}`);

      // In a real implementation, you would likely want to refresh the page or update the local state
      // to reflect the new status without a full page reload
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error updating order status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const options = getStatusOptions();

  if (options.length === 0) {
    return (
      <div className="text-sm text-gray-500">No status updates available</div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isUpdating}
        className="inline-flex justify-between items-center w-56 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
      >
        {isUpdating ? "Updating..." : "SELECT A STATUS UPDATE"}
        <svg
          className="ml-2 -mr-1 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-96 bg-white shadow-lg rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {options.map((option) => (
              <div
                key={option.id}
                className="border-b border-gray-100 last:border-b-0"
              >
                <div className="px-4 py-3">
                  <div className="font-medium">{option.label}</div>
                  <div className="text-sm text-gray-500">
                    {option.description}
                  </div>
                  <button
                    onClick={() => handleStatusUpdate(option.id)}
                    className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none"
                  >
                    UPDATE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusUpdateDropdown;
