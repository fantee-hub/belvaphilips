import { Suspense } from "react";
import FinalizeContent from "@/components/finalize/FinalizeContent";
import Spinner from "@/components/ui/Spinner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function FinalizePage() {
  return (
    <>
      <Header />
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
      <Footer />
    </>
  );
}
