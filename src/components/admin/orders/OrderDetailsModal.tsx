"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Image from "next/image";

interface OrderDetailsModalProps {
  order: any;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-[343px] sm:!max-w-[1115px] max-h-[80vh] sm:max-h-[90vh] overflow-y-auto p-4 sm:p-7 !rounded-none">
        <DialogHeader>
          <DialogTitle className="!font-normal pb-5 border-b">
            <div className="flex flex-col sm:flex-row sm:gap-9 gap-4 text-left">
              <div>
                <div className="text-sm sm:text-base text-[#787878] mb-2">
                  REQUEST ID
                </div>
                <div className="font-semibold text-[#1D1D1B] text-sm sm:text-base">
                  {order?.order_name}
                </div>
              </div>
              <div>
                <div className="text-sm sm:text-base text-[#787878] mb-2">
                  USER EMAIL
                </div>
                <div className="font-semibold text-[#1D1D1B] text-sm sm:text-base break-all">
                  {order?.user_email}
                </div>
              </div>
            </div>
          </DialogTitle>

          <div className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2 border-[0.5px] border-[#1D1D1B] bg-[#F0F0F0] p-4">
                <h3 className="text-lg sm:text-[20px] font-bold text-left">
                  SUMMARY
                </h3>
                <div className="space-y-1 text-sm sm:text-base text-gray-600">
                  {order?.product_name && (
                    <div className="flex justify-between font-semibold">
                      <span className="text-[#1D1D1B]">Product</span>
                      <span className="text-[#1D1D1B] capitalize">
                        {order?.product_name?.toLowerCase() ||
                          "No Product Selected"}
                      </span>
                    </div>
                  )}

                  {order?.shoot_type && (
                    <div className="flex justify-between">
                      <span className="text-[#787878]">Shoot type</span>
                      <span className="font-medium capitalize text-[#444444]">
                        {order?.shoot_type.toLowerCase() ||
                          "No Shoot Type Selected"}
                      </span>
                    </div>
                  )}

                  {order?.finish_type && (
                    <div className="flex justify-between">
                      <span className="text-[#787878]">Finish Type</span>
                      <span className="font-medium capitalize text-[#444444]">
                        {order?.finish_type?.toLowerCase() ||
                          "No Finish Type Selected"}
                      </span>
                    </div>
                  )}
                  {order?.shoot_type && order.quantity > 0 && (
                    <div className="flex justify-between">
                      <span className="text-[#787878]">
                        {order?.shoot_type === "VIDEO" ? "Video" : "Image"}{" "}
                        Quantity
                      </span>
                      <span className="font-medium text-[#444444]">
                        x{order?.quantity || 1}
                      </span>
                    </div>
                  )}
                  {order?.membership_type && (
                    <div className="pt-4 mt-4 border-t-[0.5px] border-[#D1D1D1]">
                      <div className="flex justify-between font-semibold">
                        <span className="text-[#1D1D1B]">Membership Plans</span>
                        <span className="text-[#1D1D1B] capitalize">
                          {order?.membership_type}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 mt-4 border-t-[0.5px] border-[#D1D1D1]">
                    <div className="flex justify-between font-semibold">
                      <span className="text-[#1D1D1B]">Delivery</span>
                      <span className="text-[#1D1D1B] capitalize">
                        {order?.delivery_speed}
                      </span>
                    </div>
                  </div>

                  {order?.shoot_type === "VIDEO" && order?.details && (
                    <div className="pt-4 mt-4 border-t-[0.5px] border-[#D1D1D1] text-left">
                      <h3 className="font-semibold mb-2 text-[#1D1D1B]">
                        Video Details:
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-[#444444]">Video Type</span>
                          <span className="font-medium text-[#444444]">
                            {order?.details["Video Type"]}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#444444]">
                            Animation Package
                          </span>
                          <span className="font-medium text-[#444444]">
                            {order?.details["Animation Package"]}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#444444]">Video Style</span>
                          <span className="font-medium text-[#444444]">
                            {order?.details["Video Style"]}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* 
                  {productConfig.shootType &&
                            productConfig.quantity! > 0 && (
                              <div className="flex justify-between">
                                <span className="text-[#787878]">
                                  {productConfig.shootType === "VIDEO"
                                    ? "Video"
                                    : "Image"}{" "}
                                  Quantity
                                </span>
                                <span className="font-medium text-[#444444]">
                                  x{productConfig.quantity || 1}
                                </span>
                              </div>
                            )} */}

                  {/* <div className="pt-4 mt-4 border-t-[0.5px] border-[#D1D1D1]">
                    <h3 className="font-semibold mb-2 text-[#1D1D1B]">
                      Scene:
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-[#444444]">Backdrop</span>
                        <span className="font-medium text-[#444444]">
                          White
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#444444]">Items in frame</span>
                        <span className="font-medium text-[#444444]">
                          Single
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#444444]">Shadow</span>
                        <span className="font-medium text-[#444444]">
                          No Shadow
                        </span>
                      </div>
                    </div>
                  </div> */}

                  <div className="pt-4 mt-4 border-t-[0.5px] border-[#D1D1D1] flex justify-between">
                    <h3 className="font-semibold text-[#1D1D1B] mb-2">
                      Shots:
                    </h3>
                    <div className="flex flex-col gap-1 text-right">
                      {order?.shots.map((shot: any, index: number) => (
                        <div key={index}>
                          <span className="text-[#444444]"></span>
                          <span className="font-medium capitalize">
                            {shot.toLowerCase()} Shot
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="border-[0.5px] border-[#1D1D1B] bg-[#F0F0F0] space-y-2 p-4 text-left">
                  <h3 className="text-base sm:text-lg font-bold text-[#1D1D1B] ">
                    PROJECT BRIEF
                  </h3>
                  <div>
                    <p className="text-sm sm:text-base text-[#1D1D1B] break-words">
                      {order?.product_description}
                    </p>
                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mt-3">
                      <button className="cursor-pointer border-[0.5px] border-[#444444] w-full sm:w-[134px] h-[37px] rounded-full font-semibold text-sm flex items-center justify-center gap-2">
                        <span>
                          <svg
                            width="14"
                            height="15"
                            viewBox="0 0 14 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.023 4.28953L9.08547 0.352031C9.03319 0.299812 8.97114 0.258404 8.90285 0.230173C8.83457 0.201943 8.76139 0.187442 8.6875 0.1875H1.9375C1.63913 0.1875 1.35298 0.306027 1.142 0.517005C0.931026 0.727983 0.8125 1.01413 0.8125 1.3125V13.6875C0.8125 13.9859 0.931026 14.272 1.142 14.483C1.35298 14.694 1.63913 14.8125 1.9375 14.8125H12.0625C12.3609 14.8125 12.647 14.694 12.858 14.483C13.069 14.272 13.1875 13.9859 13.1875 13.6875V4.6875C13.1876 4.61361 13.1731 4.54043 13.1448 4.47215C13.1166 4.40386 13.0752 4.34181 13.023 4.28953ZM9.25 2.10773L11.2673 4.125H9.25V2.10773ZM12.0625 13.6875H1.9375V1.3125H8.125V4.6875C8.125 4.83668 8.18426 4.97976 8.28975 5.08525C8.39524 5.19074 8.53832 5.25 8.6875 5.25H12.0625V13.6875Z"
                              fill="black"
                            />
                          </svg>
                        </span>
                        Photodesc
                      </button>
                      <button className="cursor-pointer border-[0.5px] border-[#444444] w-full sm:w-[134px] h-[37px] rounded-full font-semibold text-sm flex items-center justify-center gap-2">
                        <span>
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6.781 8.87531C6.72965 8.79816 6.66004 8.73488 6.57834 8.69112C6.49664 8.64735 6.4054 8.62445 6.31272 8.62445C6.22004 8.62445 6.12879 8.64735 6.0471 8.69112C5.9654 8.73488 5.89578 8.79816 5.84444 8.87531L4.37842 11.0754L3.69217 10.008C3.64124 9.9288 3.57122 9.86361 3.48854 9.81847C3.40586 9.77332 3.31317 9.74966 3.21897 9.74966C3.12477 9.74966 3.03207 9.77332 2.94939 9.81847C2.86671 9.86361 2.7967 9.9288 2.74577 10.008L0.214515 13.9455C0.159815 14.0305 0.12902 14.1287 0.125368 14.2297C0.121715 14.3307 0.145341 14.4308 0.19376 14.5195C0.24218 14.6082 0.313605 14.6822 0.400526 14.7338C0.487448 14.7853 0.586655 14.8125 0.687719 14.8125H9.68772C9.78958 14.8126 9.88955 14.785 9.97695 14.7327C10.0644 14.6804 10.1359 14.6053 10.184 14.5155C10.2321 14.4257 10.2549 14.3245 10.2499 14.2228C10.245 14.121 10.2125 14.0225 10.156 13.9378L6.781 8.87531ZM1.7178 13.6875L3.21897 11.3524L3.89608 12.4071C3.94658 12.4857 4.01587 12.5505 4.09769 12.5957C4.17951 12.6408 4.27129 12.6648 4.36473 12.6656C4.45817 12.6664 4.55032 12.6438 4.63288 12.6001C4.71543 12.5563 4.78578 12.4926 4.83756 12.4148L6.31412 10.2021L8.63655 13.6875H1.7178ZM14.0225 4.28953L10.085 0.352031C9.97958 0.246741 9.8367 0.187569 9.68772 0.1875H2.93772C2.63935 0.1875 2.3532 0.306026 2.14222 0.517005C1.93124 0.727983 1.81272 1.01413 1.81272 1.3125V7.5C1.81272 7.64918 1.87198 7.79226 1.97747 7.89775C2.08296 8.00324 2.22603 8.0625 2.37522 8.0625C2.5244 8.0625 2.66748 8.00324 2.77297 7.89775C2.87846 7.79226 2.93772 7.64918 2.93772 7.5V1.3125H9.12522V4.6875C9.12522 4.83668 9.18448 4.97976 9.28997 5.08525C9.39546 5.19074 9.53853 5.25 9.68772 5.25H13.0627V13.6875H12.5002C12.351 13.6875 12.208 13.7468 12.1025 13.8523C11.997 13.9577 11.9377 14.1008 11.9377 14.25C11.9377 14.3992 11.997 14.5423 12.1025 14.6477C12.208 14.7532 12.351 14.8125 12.5002 14.8125H13.0627C13.3611 14.8125 13.6472 14.694 13.8582 14.483C14.0692 14.272 14.1877 13.9859 14.1877 13.6875V4.6875C14.1878 4.61361 14.1733 4.54043 14.145 4.47215C14.1168 4.40386 14.0754 4.34181 14.0232 4.28953H14.0225ZM10.2502 2.10773L12.2675 4.125H10.2502V2.10773Z"
                              fill="black"
                            />
                          </svg>
                        </span>
                        Autodesc
                      </button>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg sm:text-[20px] font-bold mt-4 sm:mt-8 text-left">
                  SHOT REFERENCES
                </h3>
                <div>
                  <Image
                    src="/assets/images/shot-reference.png"
                    alt="shot reference"
                    width={134.16}
                    height={142}
                    className="w-[134.16px] h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsModal;
