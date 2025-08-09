"use client";

import Pagination from "@/components/admin/blog/allPosts/Pagination";
import ClientGalleryTableModal from "@/components/admin/client-galleries/ClientGalleryTableModal";
import GalleriesDeleteModal from "@/components/admin/client-galleries/GalleryDeleteModal";
import Spinner from "@/components/ui/Spinner";
import { getAllGallery, deleteGallery } from "@/lib/api";
import setAuthToken from "@/lib/api/setAuthToken";

import { formatDate } from "@/lib/helperFunctions";
import { useState, useEffect, useCallback } from "react";
import { PiCalendarDots } from "react-icons/pi";
import Cookies from "universal-cookie";

interface Image {
  [key: string]: string;
}

interface Gallery {
  created_at: string;
  updated_at: string;
  title: string;
  slug: string;
  id: string;
  images: string[];
}

interface ClientGallery {
  galleries: Gallery[];
  total: number;
}

const sortedOrders = [
  {
    id: "1",
    order_name: "Order #12345",
    created_at: "2023-10-01T12:00:00Z",
    updated_at: "2023-10-02T12:00:00Z",
    status: "pending",
  },
];

export default function ClientGalleries() {
  const [currentPage, setCurrentPage] = useState(1);
  const [allGalleries, setAllGalleries] = useState<Gallery[]>([]);
  const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(null);
  const [galleryToDelete, setGalleryToDelete] = useState<Gallery | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const cookies = new Cookies();

  const ordersPerPage = 5;

  const totalPages = Math.ceil(allGalleries.length / ordersPerPage);
  const paginatedOrders = allGalleries?.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  const fetchGalleries = useCallback(async () => {
    setIsLoading(true);

    const token = cookies.get("admin_token");
    if (token) {
      setAuthToken(token);
    }

    try {
      const { data } = await getAllGallery();
      if (data) {
        setAllGalleries(data.data.galleries);
        console.log("Fetched Galleries:", data.data.galleries);
      }
    } catch (error) {
      console.error("Error fetching galleries:", error);
    } finally {
      setIsLoading(false);
    }
  }, [getAllGallery, cookies, setAuthToken]);

  useEffect(() => {
    fetchGalleries();
  }, []);

  const handleDeleteClick = (gallery: Gallery) => {
    setGalleryToDelete(gallery);
    setShowDeleteModal(true);
  };

  const handleDeleteGallery = async () => {
    if (galleryToDelete) {
      setIsDeleting(true);
      try {
        await deleteGallery(galleryToDelete.id);
        setAllGalleries((prev) =>
          prev.filter((gallery) => gallery.id !== galleryToDelete.id)
        );
        setGalleryToDelete(null);
        setShowDeleteModal(false);

        await fetchGalleries();
      } catch (error) {
        console.error("Error deleting gallery:", error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleCancelDelete = () => {
    setGalleryToDelete(null);
    setShowDeleteModal(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-40 max-w-[991px]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto md:pt-[140px] py-[120px] px-4 md:px-0">
      <div className="md:pb-[56px] pb-6 md:pl-6">
        <h1 className="text-[22px] font-semibold text-[#1D1D1B]">
          CLIENT GALLERIES
        </h1>
      </div>
      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-[595px] divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-base font-medium text-[#787878] uppercase tracking-wider">
                TITLE
              </th>
              <th className="px-6 py-3 text-left text-base font-medium text-[#787878] uppercase tracking-wider">
                DATE CREATED
              </th>
              <th className="px-6 py-3 text-center text-base font-medium text-[#787878] uppercase tracking-wider">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedOrders.length > 0 ? (
              paginatedOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-base font-semibold text-[#1D1D1B]">
                    {order.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-[#1D1D1B] font-semibold">
                    <span className="flex items-center gap-1">
                      <PiCalendarDots className="text-lg" />
                      {formatDate(order.created_at)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500 flex ">
                    <button
                      onClick={() => setSelectedGallery(order)}
                      className="bg-black text-white px-4 py-2 rounded-full text-sm font-semibold uppercase cursor-pointer mr-3"
                    >
                      VIEW DETAILS
                    </button>
                    <button
                      onClick={() => handleDeleteClick(order)}
                      className="w-[78px] h-[38px] flex items-center justify-center border border-[#E72E2E] cursor-pointer uppercase text-sm font-semibold text-[#E72E2E] rounded-full"
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No galleries found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden">
        {paginatedOrders.length > 0 ? (
          <div className="space-y-10">
            {paginatedOrders.map((order) => (
              <div key={order.id} className="">
                <div className="space-y-7">
                  <div>
                    <p className="text-xs font-medium text-[#787878] uppercase">
                      REQUEST ID
                    </p>
                    <p className="text-base font-semibold text-[#1D1D1B]">
                      {order.slug}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-[#787878] uppercase">
                      DATE CREATED
                    </p>
                    <p className="text-base font-semibold text-[#1D1D1B] flex items-center gap-1">
                      <PiCalendarDots className="text-lg" />
                      {formatDate(order.created_at)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-[#787878] uppercase">
                      ACTION
                    </p>
                    <button
                      onClick={() => setSelectedGallery(order)}
                      className="mt-1 bg-black text-white px-4 py-2 rounded-full text-sm font-semibold uppercase cursor-pointer mb-3"
                    >
                      VIEW DETAILS
                    </button>
                    <button
                      onClick={() => handleDeleteClick(order)}
                      className="w-[78px] h-[38px] flex items-center justify-center border border-[#E72E2E] cursor-pointer uppercase text-sm font-semibold text-[#E72E2E] rounded-full"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-sm text-gray-500 py-4">
            No galleries found
          </div>
        )}
      </div>
      <div className="flex justify-start">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <ClientGalleryTableModal
        order={selectedGallery}
        isOpen={!!selectedGallery}
        onClose={() => setSelectedGallery(null)}
        fetchGalleries={fetchGalleries}
      />

      <GalleriesDeleteModal
        onOpenChange={setShowDeleteModal}
        showConfirmModal={showDeleteModal}
        handleDeleteChanges={handleDeleteGallery}
        handleStay={handleCancelDelete}
        galleryTitle={galleryToDelete?.title || ""}
        isDeleting={isDeleting}
      />
    </div>
  );
}
