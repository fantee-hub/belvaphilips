"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoArrowRight } from "react-icons/go";
import Image from "next/image";
import { Edit, PaperclipIcon, Pencil, Trash2, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import MembershipModal from "./MembershipModal";
import { useSearchParams } from "next/navigation";

interface ProductConfig {
  category?: string;
  shootType?: string;
  finish?: string;
  quantity?: number;
  basePrice?: number;
  total?: number;
  price?: string;
  membershipPlan?: string;
  rate?: string;
  animationPackage?: string;
  details?: {
    "Video Type"?: string;
    "Animation Package"?: string;
    "Video Style"?: string;
  };
}

const FinalizeProjectPage = () => {
  const router = useRouter();
  const [productConfig, setProductConfig] = useState<ProductConfig>({});
  const [projectDescription, setProjectDescription] = useState("");
  const [selectedShots, setSelectedShots] = useState<string[]>(["FRONT"]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [selectedLighting, setSelectedLighting] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);
  const searchParams = useSearchParams();
  const pageTitle = searchParams.get("brief");
  const shootTypes = ["Studio Shot", "Lifestyle Shot", "Dramatic Lighting"];
  const shotsTypes = [
    {
      name: "FRONT",
      description: "Front shot of the product",
      image: "/assets/images/front.png",
    },
    {
      name: "BACK",
      description: "Back shot of the product",
      image: "/assets/images/back.png",
    },
    {
      name: "SIDE",
      description: "Side shot of the product",
      image: "/assets/images/side.png",
    },
    {
      name: "CLOSE-UP",
      description: "Close-up shot of the product",
      image: "/assets/images/close-up.png",
    },
  ];
  const [customShots, setCustomShots] = useState<
    { id?: string; name: string; src: string }[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    try {
      const storedConfig = localStorage.getItem("productConfig");
      if (storedConfig) {
        const parsedConfig = JSON.parse(storedConfig);
        setProductConfig(parsedConfig);
      } else {
        console.warn("No product configuration found");
      }
    } catch (error) {
      console.error("Error retrieving product configuration:", error);
    }
    setIsLoading(false);
  }, [router]);

  const toggleShot = (shot: string) => {
    if (selectedShots.includes(shot)) {
      setSelectedShots(selectedShots.filter((s) => s !== shot));
    } else {
      setSelectedShots([...selectedShots, shot]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
  };

  const handleCustomShotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          const newName = `Uploaded ${customShots.length + 1}`;
          setCustomShots((prev) => [
            ...prev,
            { name: newName, src: reader.result as string },
          ]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleLightingSelect = (lighting: string) => {
    setSelectedLighting(lighting);
  };

  const removeFile = (index: number) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
  };

  const handleRemoveProduct = (productId: number) => {
    const newCustomShots = customShots.filter(
      (_, index) => index !== productId
    );
    setCustomShots(newCustomShots);
  };

  const handleEditShot = (index: number) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            setCustomShots((prev) =>
              prev.map((shot, i) =>
                i === index ? { ...shot, src: reader.result as string } : shot
              )
            );
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleCheckout = () => {
    const finalizedOrder = {
      ...productConfig,
      projectDescription,
      selectedShots,
      selectedLighting,
      uploadedFiles: uploadedFiles.map((file) => file.name),
      ...(productConfig.shootType === "VIDEO" && {
        details: {
          "Video Type": productConfig.details?.["Video Type"] || "Standard",
          "Animation Package":
            productConfig.details?.["Animation Package"] || "30 secs",
          "Video Style": productConfig.details?.["Video Style"] || "Normal",
        },
      }),
    };

    localStorage.setItem("finalizedOrder", JSON.stringify(finalizedOrder));
    router.push("/checkout");

    console.log("Proceeding to checkout with:", finalizedOrder);
  };

  const totalPrice =
    (productConfig.basePrice || 0) * (productConfig.quantity || 1);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading configuration...</p>
      </div>
    );
  }

  console.log(pageTitle);

  return (
    <div className="md:pt-[60px] pt-20 bg-[#F5F5F5]">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="mb-6">
          <motion.div
            className="flex items-center text-sm gap-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {productConfig.category && (
              <>
                <span className="text-[#AAAAAA] font-medium">
                  {productConfig.category || "CLOTHING"}
                </span>
                <span>
                  <GoArrowRight />
                </span>
              </>
            )}

            {productConfig.shootType && (
              <>
                <span className="text-[#AAAAAA] font-medium">
                  {productConfig.shootType || "FLATLAY"}
                </span>
                <span>
                  <GoArrowRight />
                </span>
              </>
            )}

            {!pageTitle && (
              <span className="text-[#1D1D1B] font-bold">FINALIZE</span>
            )}
          </motion.div>
        </div>

        <h1 className="md:text-5xl text-[38px] leading-[110%] font-bold md:mb-4 mb-2 uppercase">
          {pageTitle || "FINALIZE YOUR PROJECT"}
        </h1>
        <p className="text-[#444444] mb-10 md:text-base text-sm">
          Review and customize your shoot details before checkout.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
          <div className="lg:col-span-1">
            <div className="mb-7 border-b-[0.5px] pb-5 border-[#D1D1D1]">
              <div className="flex items-center md:mb-2">
                <h2 className="md:text-[28px] text-[26px] font-semibold">
                  PROJECT DESCRIPTION
                </h2>
                <span className="text-red-500 ml-2 text-2xl">*</span>
              </div>
              <p className="text-[#444444] mb-4 max-w-[516px] md:text-base text-sm">
                Share details, creative direction, and any reference images to
                help us bring your project to life.
              </p>
              <div className="relative">
                <textarea
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className="w-full border-[0.7px] border-[#C9C9C9] p-4 md:h-[204px] h-[234px] mb-2 focus:outline-none focus:ring-1 placeholder:text-[#B9B9B9] focus:ring-gray-200"
                  placeholder="Example: Clean white background, soft shadows, lifestyle setting."
                />

                <div className="flex flex-wrap gap-3 mb-4 absolute md:bottom-6 bottom-[10px] left-5">
                  {shootTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => handleLightingSelect(type)}
                      className={`px-[10px] py-1 border rounded-full text-sm font-medium text-[#1D1D1B] cursor-pointer ${
                        selectedLighting === type
                          ? "border-black bg-white"
                          : "border-[#C9C9C9] border-[0.5px]"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              {/* <div className="mt-0">
                <label
                  htmlFor="file-upload"
                  className="border border-[#1D1D1B] font-semibold rounded-full w-[196px] h-[37px] text-sm flex items-center justify-center cursor-pointer hover:bg-gray-50"
                >
                  <span className="font-medium">ATTACH FILE/IMAGE</span>
                  <PaperclipIcon className="h-4 w-4 ml-2" />
                </label>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".png,.jpg,.jpeg"
                />

                {uploadedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 border border-gray-200"
                      >
                        <span>{file.name}</span>
                        <button
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div> */}
            </div>

            <div className="mb-10">
              <h2 className="md:text-[28px] text-[26px] text-[#1D1D1B] font-semibold md:mb-3 max-w-[516px]">
                SELECT YOUR SHOTS
              </h2>
              <p className="text-[#444444] mb-6 md:text-base text-sm">
                Choose the perfect angles to showcase your product with clarity
                and style.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {shotsTypes.map((shot) => (
                  <div
                    key={shot.name}
                    className={`border cursor-pointer relative ${
                      selectedShots.includes(shot.name)
                        ? "border-gray-800"
                        : "border-gray-200"
                    }`}
                    onClick={() => toggleShot(shot.name)}
                  >
                    <div className="aspect-square bg-gray-100 relative flex justify-center w-full overflow-hidden">
                      <Image
                        src={shot.image}
                        alt={`${shot.name} shot`}
                        width={200}
                        height={200}
                        className="object-contain"
                      />
                    </div>
                    <div className="bg-[#D2D2D2] px-2 py-1 text-left font-medium text-sm font-semibold">
                      {shot.name}
                    </div>
                  </div>
                ))}
                {customShots.map((shot, index) => (
                  <div
                    key={shot.name}
                    className={`border cursor-pointer relative ${
                      selectedShots.includes(shot.name)
                        ? "border-gray-800"
                        : "border-gray-200"
                    }`}
                    onClick={() => toggleShot(shot.name)}
                  >
                    <div className="aspect-square bg-gray-100 relative overflow-hidden">
                      <Image
                        src={shot.src}
                        alt={`Custom shot ${index + 1}`}
                        width={200}
                        height={200}
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute bottom-0 pb-[2px] pr-2 gap-1 right-0 flex items-center space-x-1 bg-white left-0 justify-end">
                      <button
                        className="bg-white rounded-full p-1 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditShot(index);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <div className="w-[0.5px] h-[15px] bg-[#CFCFCF]"></div>
                      <button
                        className="bg-white rounded-full p-1 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveProduct(index);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="cursor-pointer relative border-[0.5px] border-[#C9C9C9]">
                  <div className="text-center font-medium text-sm absolute top-3 left-1/2 -translate-x-1/2 w-full">
                    Custom Shots
                  </div>
                  <label
                    htmlFor="custom-shot-upload"
                    className="cursor-pointer block"
                  >
                    <div className="aspect-square flex flex-col py-[66px] p-0">
                      <p className="text-xs text-gray-500 text-center">
                        Drag & Drop or
                        <br />
                        <span className="text-[#C49524]">Click to Upload</span>
                      </p>
                    </div>
                    <div className="text-[10px] text-[#787878] text-center absolute bottom-3 left-1/2 -translate-x-1/2 w-full">
                      PNG & JPG supported
                    </div>
                  </label>
                  <input
                    id="custom-shot-upload"
                    type="file"
                    multiple
                    className="hidden"
                    accept=".png,.jpg,.jpeg"
                    onChange={handleCustomShotUpload}
                  />
                </div>
              </div>
            </div>

            <motion.button
              className="w-full bg-black text-white font-bold h-[47px] font-semibold mb-10 flex items-center justify-center hover:bg-gray-800 transition-colors cursor-pointer rounded-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCheckout}
            >
              CONTINUE TO CHECKOUT
            </motion.button>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-[150px]">
              <div className="border-[0.5px] border-[#1D1D1B] mb-4 -mx-4 md:mx-0">
                <div className="p-5 bg-[#F0F0F0]">
                  <div
                    className="flex justify-between items-center mb-4"
                    onClick={() => setIsSummaryExpanded(!isSummaryExpanded)}
                  >
                    <h2 className="text-[20px] font-bold">SUMMARY</h2>
                    <button className="md:hidden flex items-center gap-2 text-[#444444] text-sm font-medium">
                      <svg
                        className={`h-5 w-5 transition-transform duration-300 ${
                          isSummaryExpanded ? "rotate-180" : ""
                        }`}
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.0233 10.8517L9.39828 5.22672C9.34604 5.17442 9.284 5.13293 9.21572 5.10462C9.14743 5.07631 9.07423 5.06175 9.00031 5.06175C8.92639 5.06175 8.8532 5.07631 8.78491 5.10462C8.71662 5.13293 8.65458 5.17442 8.60234 5.22672L2.97734 10.8517C2.8718 10.9573 2.8125 11.1004 2.8125 11.2497C2.8125 11.399 2.8718 11.5421 2.97734 11.6477C3.08289 11.7532 3.22605 11.8125 3.37531 11.8125C3.52458 11.8125 3.66773 11.7532 3.77328 11.6477L9.00031 6.41992L14.2273 11.6477C14.2796 11.6999 14.3417 11.7414 14.4099 11.7697C14.4782 11.7979 14.5514 11.8125 14.6253 11.8125C14.6992 11.8125 14.7724 11.7979 14.8407 11.7697C14.909 11.7414 14.971 11.6999 15.0233 11.6477C15.0755 11.5954 15.117 11.5334 15.1453 11.4651C15.1736 11.3968 15.1881 11.3236 15.1881 11.2497C15.1881 11.1758 15.1736 11.1026 15.1453 11.0343C15.117 10.966 15.0755 10.904 15.0233 10.8517Z"
                          fill="#444444"
                        />
                      </svg>
                    </button>
                  </div>

                  <AnimatePresence>
                    {(isSummaryExpanded || window.innerWidth >= 768) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-[10px]">
                          {productConfig.category && (
                            <div className="flex justify-between font-semibold">
                              <span className="text-[#1D1D1B]">Product</span>
                              <span className="text-[#1D1D1B] capitalize">
                                {productConfig.category?.toLowerCase() ||
                                  "Clothing"}
                              </span>
                            </div>
                          )}
                          {productConfig.shootType && (
                            <div className="flex justify-between">
                              <span className="text-[#787878]">Shoot type</span>
                              <span className="font-medium capitalize text-[#444444]">
                                {productConfig.shootType?.toLowerCase() ||
                                  "Flatlay"}
                              </span>
                            </div>
                          )}
                          {productConfig.finish && (
                            <div className="flex justify-between">
                              <span className="text-[#787878]">
                                Finish Type
                              </span>
                              <span className="font-medium capitalize text-[#444444]">
                                {productConfig.finish?.toLowerCase() ||
                                  "Basic End Finish"}
                              </span>
                            </div>
                          )}

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
                            )}

                          {productConfig.rate && (
                            <div className="flex justify-between">
                              <span className="text-[#787878]">Rate</span>
                              <span className="font-medium text-[#444444] capitalize">
                                {productConfig.rate}
                              </span>
                            </div>
                          )}

                          {productConfig.animationPackage && (
                            <div className="flex justify-between">
                              <span className="text-[#787878]">
                                {productConfig.animationPackage}
                              </span>
                            </div>
                          )}

                          {productConfig.membershipPlan && (
                            <div className="flex justify-between">
                              <span className="text-[#1D1D1B] font-semibold">
                                Memebership Plans
                              </span>
                              <span className="font-medium text-[#1D1D1B] font-semibold">
                                {productConfig.membershipPlan}
                              </span>
                            </div>
                          )}

                          {productConfig.price && (
                            <div className="flex justify-between">
                              <span className="text-[#787878] ">Price</span>
                              <span className="font-medium text-[#787878]">
                                {productConfig.price}
                              </span>
                            </div>
                          )}

                          {productConfig.shootType === "VIDEO" &&
                            productConfig.details && (
                              <div className="pt-4 border-t border-gray-200">
                                <h3 className="font-semibold mb-2 text-[#1D1D1B]">
                                  Video Details:
                                </h3>
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span className="text-[#444444]">
                                      Video Type
                                    </span>
                                    <span className="font-medium text-[#444444]">
                                      {productConfig.details["Video Type"]}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-[#444444]">
                                      Animation Package
                                    </span>
                                    <span className="font-medium text-[#444444]">
                                      {
                                        productConfig.details[
                                          "Animation Package"
                                        ]
                                      }
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-[#444444]">
                                      Video Style
                                    </span>
                                    <span className="font-medium text-[#444444]">
                                      {productConfig.details["Video Style"]}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )}

                          {/* <div className="pt-4 border-t border-gray-200">
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
                                <span className="text-[#444444]">
                                  Items in frame
                                </span>
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

                          <div className="pt-4 border-t border-gray-200 flex justify-between">
                            <h3 className="font-semibold text-[#1D1D1B] mb-2">
                              Shots:
                            </h3>
                            <div className="flex flex-col gap-1 text-right">
                              {selectedShots.map((shot, index) => (
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
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div
                className="py-[7px] border-[0.5px] border-[#1D1D1B] pl-3 md:pr-5 pr-3 -mx-4 md:mx-0"
                style={{
                  background:
                    "linear-gradient(to right, #FFFFFF 30%, #E7E7E7 85%, #DEDEDE 100%)",
                }}
              >
                <div className="flex justify-between items-center w-full gap-3 md:gap-0">
                  <span className="font-semibold text-[#1D1D1B] text-sm md:text-base">
                    Upgrade your membership in order to save up to 25%!
                  </span>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-black text-white md:h-[38px] h-[32px] md:w-[106px] px-3 md:px-0 flex items-center justify-center text-sm font-semibold uppercase rounded-full cursor-pointer"
                  >
                    Upgrade
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MembershipModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
};

export default FinalizeProjectPage;
