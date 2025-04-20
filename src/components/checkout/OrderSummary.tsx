interface OrderSummaryProps {
  orderDetails: any;
  selectedDeliveryType: string;
  onUpgrade: () => void;
}

export default function OrderSummary({
  orderDetails,
  selectedDeliveryType,
  onUpgrade,
}: OrderSummaryProps) {
  return (
    <div className="sticky top-20">
      {/* Summary Card */}
      <div className="border border-black mb-4">
        <div className="p-5 bg-[#F0F0F0]">
          <h2 className="text-[20px] font-bold mb-4">SUMMARY</h2>

          <div className="space-y-3">
            <div className="flex justify-between font-semibold">
              <span>Product</span>
              <span className="capitalize">
                {orderDetails.category?.toLowerCase() || "Clothing"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Shoot type</span>
              <span className="font-medium capitalize">
                {orderDetails.shootType?.toLowerCase() || "Flatlay"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Finish Type</span>
              <span className="font-medium capitalize">
                {orderDetails.finish?.toLowerCase() || "Basic End Finish"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Image Quantity</span>
              <span className="font-medium">x{orderDetails.quantity || 1}</span>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h3 className="font-semibold mb-2">Scene:</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Backdrop</span>
                  <span className="font-medium">White</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Items in frame</span>
                  <span className="font-medium">Single</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shadow</span>
                  <span className="font-medium">No Shadow</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 flex justify-between">
              <h3 className="font-semibold mb-2">Shots:</h3>
              <div className="flex flex-col gap-1 text-right">
                {orderDetails.selectedShots?.map(
                  (shot: string, index: number) => (
                    <div key={index}>
                      <span className="font-medium capitalize">
                        {shot.toLowerCase()} Shot
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 flex justify-between">
              <h3 className="font-semibold mb-2">Delivery</h3>
              <span className="font-medium capitalize">
                {selectedDeliveryType}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Membership Upgrade */}
      <div
        className="py-[7px] border border-black pl-3 pr-5"
        style={{
          background:
            "linear-gradient(to right, #FFFFFF 30%, #E7E7E7 85%, #DEDEDE 100%)",
        }}
      >
        <div className="flex justify-between items-center w-full">
          <span className="font-semibold">
            Upgrade your membership in order to save up to 25%!
          </span>
          <button
            onClick={onUpgrade}
            className="bg-black cursor-pointer text-white h-[38px] w-[106px] flex items-center justify-center text-sm font-semibold uppercase rounded-full"
          >
            Upgrade
          </button>
        </div>
      </div>
    </div>
  );
}
