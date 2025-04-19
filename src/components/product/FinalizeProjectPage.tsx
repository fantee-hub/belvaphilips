"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GoArrowRight } from "react-icons/go";
import Image from "next/image";
import { Edit, PaperclipIcon, Pencil, Trash2, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import MembershipModal from "./MembershipModal";

interface ProductConfig {
  category?: string;
  shootType?: string;
  finish?: string;
  quantity?: number;
  basePrice?: number;
  total?: number;
}

const FinalizeProjectPage = () => {
  const router = useRouter();
  const [productConfig, setProductConfig] = useState<ProductConfig>({});
  const [projectDescription, setProjectDescription] = useState("");
  const [selectedShots, setSelectedShots] = useState<string[]>(["FRONT"]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [selectedLighting, setSelectedLighting] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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

  // Retrieve product config from localStorage on component mount
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

  // Handle shot selection
  const toggleShot = (shot: string) => {
    if (selectedShots.includes(shot)) {
      setSelectedShots(selectedShots.filter((s) => s !== shot));
    } else {
      setSelectedShots([...selectedShots, shot]);
    }
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
  };
  //Handle custom shot upload
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

  // Handle lighting selection
  const handleLightingSelect = (lighting: string) => {
    setSelectedLighting(lighting);
  };

  // Handle removing uploaded file
  const removeFile = (index: number) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
  };

  // Handle removing custom shot
  const handleRemoveProduct = (productId: number) => {
    const newCustomShots = customShots.filter(
      (_, index) => index !== productId
    );
    setCustomShots(newCustomShots);
  };

  // Handle editing custom shot
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

  // Handle checkout process
  const handleCheckout = () => {
    const finalizedOrder = {
      ...productConfig,
      projectDescription,
      selectedShots,
      selectedLighting,
      uploadedFiles: uploadedFiles.map((file) => file.name), // Store file names only
    };

    // Store the finalized order data
    localStorage.setItem("finalizedOrder", JSON.stringify(finalizedOrder));

    // Navigate to checkout page
    router.push("/checkout");

    console.log("Proceeding to checkout with:", finalizedOrder);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading configuration...</p>
      </div>
    );
  }

  return (
    <div className="pt-[60px] bg-[#F5F5F5]">
      <div className="container mx-auto px-4 py-16">
        {/* Breadcrumb */}
        <div className="mb-6">
          <motion.div
            className="flex items-center text-sm gap-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-[#AAAAAA] font-medium">
              {productConfig.category || "CLOTHING"}
            </span>
            <span>
              <GoArrowRight />
            </span>
            <span className="text-[#AAAAAA] font-medium">
              {productConfig.shootType || "FLATLAY"}
            </span>
            <span>
              <GoArrowRight />
            </span>
            <span className="text-[#1D1D1B] font-bold">FINALIZE</span>
          </motion.div>
        </div>

        {/* Page Title */}
        <h1 className="text-5xl leading-[110%] font-bold mb-4">
          FINALIZE YOUR PROJECT
        </h1>
        <p className="text-[#444444] mb-10">
          Review and customize your shoot details before checkout.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left column - Project Details */}
          <div className="lg:col-span-1">
            {/* Project Description */}
            <div className="mb-7 border-b-[0.5px] pb-7 border-[#D1D1D1]">
              <div className="flex items-center mb-2">
                <h2 className="text-[28px] font-semibold">
                  PROJECT DESCRIPTION
                </h2>
                <span className="text-red-500 ml-2 text-2xl">*</span>
              </div>
              <p className="text-[#444444] mb-4 max-w-[516px]">
                Share details, creative direction, and any reference images to
                help us bring your project to life.
              </p>
              <div className="relative">
                <textarea
                  className="w-full border-[0.7px] border-[#C9C9C9] p-4 h-[204px] mb-2 focus:outline-none focus:ring-1 placeholder:text-[#B9B9B9] focus:ring-gray-200"
                  placeholder="Example: Clean white background, soft shadows, lifestyle setting."
                />

                <div className="flex flex-wrap gap-3 mb-4 absolute bottom-6 left-5">
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
              <div className="mt-0">
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

                {/* Display uploaded files */}
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
              </div>
            </div>

            {/* Shot Selection */}
            <div className="mb-10">
              <h2 className="text-[28px] text-[#1D1D1B] font-semibold mb-3 max-w-[516px]">
                SELECT YOUR SHOTS
              </h2>
              <p className="text-gray-600 mb-6">
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
                {/* Render uploaded custom shots */}
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
                {/* Custom shot upload */}
                <div className=" cursor-pointer relative border-[0.5px] border-[#C9C9C9] ">
                  <div className=" text-center font-medium text-sm absolute top-3 left-1/2 -translate-x-1/2 w-full">
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

            {/* Checkout Button */}
            <motion.button
              className="w-full bg-black text-white font-bold h-[47px] font-semibold mb-10 flex items-center justify-center hover:bg-gray-800 transition-colors cursor-pointer rounded-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCheckout}
            >
              CONTINUE TO CHECKOUT
            </motion.button>
          </div>

          {/* Right column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              {/* Order Summary */}
              <div className="border-[0.5px] border-[#1D1D1B] mb-4">
                <div className="p-5 bg-[#F0F0F0]">
                  <h2 className="text-[20px] font-bold mb-4">SUMMARY</h2>

                  <div className="space-y-[10px]">
                    <div className="flex justify-between font-semibold">
                      <span className="text-[#1D1D1B]">Product</span>
                      <span className="text-[#1D1D1B] capitalize">
                        {productConfig.category?.toLowerCase() || "Clothing"}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-[#787878]">Shoot type</span>
                      <span className="font-medium capitalize text-[#444444]">
                        {productConfig.shootType?.toLowerCase() || "Flatlay"}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-[#787878]">Finish Type</span>
                      <span className="font-medium capitalize text-[#444444]">
                        {productConfig.finish?.toLowerCase() ||
                          "Basic End Finish"}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-[#787878]">Image Quantity</span>
                      <span className="font-medium text-[#444444]">
                        x{productConfig.quantity || 1}
                      </span>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
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
                </div>
              </div>

              {/* Membership Upgrade */}
              <div
                className="py-[7px] border-[0.5px] border-[#1D1D1B] pl-3 pr-5"
                style={{
                  background:
                    "linear-gradient(to right, #FFFFFF 30%, #E7E7E7 85%, #DEDEDE 100%)",
                }}
              >
                <div className="flex justify-between items-center w-full">
                  <span className="font-semibold text-[#1D1D1B]">
                    Upgrade your membership in order to save up to 25%!
                  </span>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-black cursor-pointer text-white h-[38px] w-[106px] flex items-center justify-center text-sm font-semibold uppercase rounded-full"
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
