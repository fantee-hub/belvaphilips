import { Suspense } from "react";
import FinalizeContent from "@/components/finalize/FinalizeContent";
import Spinner from "@/components/ui/Spinner";

export default function FinalizePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <Spinner size="lg" />
            <p className="mt-4 text-gray-600">Loading project details...</p>
          </div>
        </div>
      }
    >
      <FinalizeContent />
    </Suspense>
  );
}
