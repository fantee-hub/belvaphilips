"use client";

import { Suspense } from "react";

import OrdersTabs from "@/components/admin/orders/OrdersTabs";
import OrdersContent from "@/components/admin/orders/OrdersContent";
import OrdersLoadingSkeleton from "@/components/admin/orders/OrdersLoadingSkeleton";
import Spinner from "@/components/ui/Spinner";

export default function OrdersPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <Spinner size="lg" />
          </div>
        </div>
      }
    >
      <div className="container mx-auto md:pt-[140px] py-[120px] px-4 md:px-0">
        <OrdersTabs />
        <Suspense fallback={<OrdersLoadingSkeleton />}>
          <OrdersContent />
        </Suspense>
      </div>
    </Suspense>
  );
}
