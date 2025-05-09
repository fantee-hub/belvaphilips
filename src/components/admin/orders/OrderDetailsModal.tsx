"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

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
      <DialogContent className="!max-w-[1115px] p-7 !rounded-none">
        <DialogHeader>
          <DialogTitle className="!font-normal pb-5 border-b">
            <div className="flex gap-9">
              <div className="">
                <div className="text-base text-[#787878] mb-2">REQUEST ID</div>
                <div className="font-semibold text-[#1D1D1B]">{order?.id}</div>
              </div>
              <div>
                <div className="text-base text-[#787878] mb-2">USER EMAIL</div>
                <div className="font-semibold text-[#1D1D1B]">
                  {order?.user_email}
                </div>
              </div>
            </div>
          </DialogTitle>

          <div className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 border-[0.5px] border-[#1D1D1B] bg-[#F0F0F0] p-4">
                <h3 className="text-[20px] font-bold">SUMMARY</h3>
                <div className="space-y-1 text-base text-gray-600">
                  <div className="flex justify-between font-semibold">
                    <span className="text-[#1D1D1B]">Product</span>
                    <span className="text-[#1D1D1B] capitalize">
                      {order?.product_name?.toLowerCase() ||
                        "No Product Selected"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#787878]">Shoot type</span>
                    <span className="font-medium capitalize text-[#444444]">
                      {order?.shoot_type.toLowerCase() ||
                        "No Shoot Type Selected"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#787878]">Finish Type</span>
                    <span className="font-medium capitalize text-[#444444]">
                      {order?.finish_type?.toLowerCase() ||
                        "No Finish Type Selected"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#787878]">Image Quantity</span>
                    <span className="font-medium text-[#444444]">
                      x{order?.quantity || 0}
                    </span>
                  </div>

                  <div className="pt-4 mt-4 border-t-[0.5px] border-[#D1D1D1]">
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
                  </div>

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
                <div className="border-[0.5px] border-[#1D1D1B] bg-[#F0F0F0] space-y-2 p-4">
                  <h3 className="text-base font-bold text-[#1D1D1B]">
                    PROJECT BRIEF
                  </h3>
                  <div className=" ">
                    <p className="text-sm text-gray-600">
                      Clean white background with soft shadows
                    </p>
                    <div className="flex space-x-2">
                      <button>Photodesc</button>
                      <button>Autodesc</button>
                    </div>
                  </div>
                </div>
                <h3 className="text-sm font-medium">SHOT REFERENCES</h3>
                <div className="p-4 bg-gray-100 rounded-md">
                  <p className="text-sm text-gray-600">Front Shot</p>

                  <div className="mt-2 w-full h-32 bg-gray-300 flex items-center justify-center">
                    Image Placeholder
                  </div>
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
