"use client";

import { Suspense } from "react";

import OrdersTabs from "@/components/admin/orders/OrdersTabs";
import OrdersContent from "@/components/admin/orders/OrdersContent";
import OrdersLoadingSkeleton from "@/components/admin/orders/OrdersLoadingSkeleton";

export default function OrdersPage() {
  return (
    <div className="container mx-auto pt-[140px]">
      <OrdersTabs />
      <Suspense fallback={<OrdersLoadingSkeleton />}>
        <OrdersContent />
      </Suspense>
    </div>
  );
}
