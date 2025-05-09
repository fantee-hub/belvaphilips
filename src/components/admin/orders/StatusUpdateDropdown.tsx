"use client";

import React, { useState, useRef, useEffect } from "react";
import Cookies from "universal-cookie";
import setAuthToken from "@/lib/api/setAuthToken";
import { PiCaretDownBold } from "react-icons/pi";

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
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const cookies = new Cookies();

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
      });
    }
  }, [isOpen]);

  // Status options based on current status
  const getStatusOptions = () => {
    // Define the status workflow in order
    const statusWorkflow = [
      {
        id: "mark_as_paid",
        label: "MARK AS PAID",
        description:
          "The client has paid for the quote. Wait for product shipment.",
      },
      {
        id: "mark_received",
        label: "MARK PRODUCT AS RECEIVED & START SHOOT",
        description: "The product has arrived. Begin the photoshoot.",
      },
      {
        id: "send_for_review",
        label: "SENT IMAGES FOR REVIEW",
        description: "The images are ready. Notify the client for approval.",
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

    // Map currentStatus to the workflow index
    const statusMap: { [key: string]: number } = {
      pending: 0,
      awaiting_payment: 0, // In case your backend uses a different status name
      active: 1, // After "MARK AS PAID"
      received: 1, // After "MARK PRODUCT AS RECEIVED & START SHOOT"
      sent_for_review: 2,
      revisions_in_progress: 3,
      approved: 4,
      returned: 5,
      completed: 6,
    };

    const normalizedStatus = currentStatus.toLowerCase();
    const currentIndex = statusMap[normalizedStatus] ?? -1;

    // If the status is not found or is completed, return no options
    if (currentIndex === -1 || currentIndex === statusWorkflow.length - 1) {
      return [];
    }

    // Return all future statuses in the sequence
    return statusWorkflow.slice(currentIndex).map((option, index) => ({
      ...option,
      isNextStep: index === 0, // Only the first option (next step) is enabled
    }));
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
      console.log(`Updated order ${orderId} status to ${statusId}`);

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
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        disabled={isUpdating}
        className="inline-flex justify-between items-center  px-4 py-2 border border-[#1D1D1B] shadow-sm text-sm font-medium rounded-full cursor-pointer text-[#6E6E6E] bg-white hover:bg-gray-50 focus:outline-none"
      >
        {isUpdating ? "Updating..." : "SELECT A STATUS UPDATE"}
        <PiCaretDownBold
          className={`transition-transform duration-300 text-base ml-2 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className="fixed z-50 max-w-[455px] bg-white shadow rounded-[12px] border-[0.5px] border-[#C9C9C9] focus:outline-none"
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            maxHeight: "341px",
            overflowY: "auto",
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              width: 4px;
            }
            div::-webkit-scrollbar-track {
              background: #e5e5e5;
              border-radius: 10px;
            }
            div::-webkit-scrollbar-thumb {
              background: #313131;
              border-radius: 10px;
            }
            div::-webkit-scrollbar-thumb:hover {
              background: #313131;
            }
          `}</style>
          <div className="py-1 custom-scroll">
            {options.map((option) => (
              <div
                key={option.id}
                className="border-b border-gray-100 last:border-b-0"
              >
                <div className="px-4 py-3">
                  <div
                    className={`text-sm font-semibold ${
                      option.isNextStep ? "text-[#1D1D1B]" : "text-gray-400"
                    } whitespace-nowrap overflow-hidden text-ellipsis w-full`}
                  >
                    {option.label}
                  </div>
                  <div
                    className={`text-xs mt-1 ${
                      option.isNextStep ? "text-[#444444]" : "text-gray-300"
                    } whitespace-nowrap overflow-hidden text-ellipsis w-full`}
                  >
                    {option.description}
                  </div>
                  <button
                    onClick={() => handleStatusUpdate(option.id)}
                    disabled={!option.isNextStep}
                    className={`mt-2 inline-flex items-center px-3 py-1 border border-transparent text-xs font-semibold rounded-full text-white cursor-pointer ${
                      option.isNextStep
                        ? "bg-[#1D1D1B] hover:bg-gray-700"
                        : "bg-gray-300 cursor-not-allowed"
                    } focus:outline-none`}
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
