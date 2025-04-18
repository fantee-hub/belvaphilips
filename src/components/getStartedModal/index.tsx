"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import OptionCard from "./OptionCard";
import BriefPreview from "./BriefPreview";
import { DialogTitle } from "@radix-ui/react-dialog";
import QuoteOption from "./QuoteOption";

interface GetStartedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function GetStartedModal({
  open,
  onOpenChange,
}: GetStartedModalProps) {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [selectedShootType, setSelectedShootType] = useState<string | null>(
    null
  );

  const [productError, setProductError] = useState(false);
  const [shootTypeError, setShootTypeError] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (open) {
      setProductError(false);
      setShootTypeError(false);
    }
  }, [open]);

  const handleGetQuote = () => {
    const hasProductError = !selectedProduct;
    const hasShootTypeError = !selectedShootType;

    setProductError(hasProductError);
    setShootTypeError(hasShootTypeError);
    setShowError(hasProductError || hasShootTypeError);

    if (selectedProduct && selectedShootType) {
      console.log("Getting quote for:", { selectedProduct, selectedShootType });
    }
  };

  const handleStartBrief = () => {
    console.log("Starting brief");
    onOpenChange(false);
  };

  const handleBookCall = () => {
    console.log("Booking call");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-[833px] !pt-6 !pb-[46px] bg-white border-none !rounded-none">
        <DialogTitle className="hidden"></DialogTitle>
        <div className="relative">
          <div className="">
            <h2 className="text-[26px] font-semibold mb-8 leading-[125%] text-[#1D1D1B]">
              HOW WOULD YOU LIKE TO
              <br />
              START YOUR PROJECT?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <OptionCard
                title="FILL A BRIEF"
                description="Skip the quote & go straight to filling out your brief."
                buttonText="START BRIEF"
                onClick={handleStartBrief}
                showError={showError}
              >
                <BriefPreview />
              </OptionCard>

              <OptionCard
                title="TALK TO US"
                description="Discuss your project in detail over a call"
                buttonText="BOOK A CALL"
                buttonStyle="primary"
                onClick={handleBookCall}
              >
                <div className="relative h-full w-full">
                  <Image
                    src="/assets/images/talk-to-us.png"
                    alt="Customer service representative"
                    fill
                    className="object-cover"
                  />
                </div>
              </OptionCard>

              <OptionCard
                title="GET A QUICK QUOTE"
                description="Select your product type and shoot type for an instant estimate."
                buttonText="GET QUOTE"
                showError={showError}
                onClick={handleGetQuote}
              >
                <QuoteOption
                  showError={showError}
                  productError={productError}
                  shootTypeError={shootTypeError}
                  setProductError={setProductError}
                  setShootTypeError={setShootTypeError}
                  setSelectedProduct={setSelectedProduct}
                  setSelectedShootType={setSelectedShootType}
                />
              </OptionCard>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
