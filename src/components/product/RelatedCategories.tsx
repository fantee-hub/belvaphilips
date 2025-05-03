import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { categories, portfolios } from "@/lib/mockData";

// Filter out "ALL" and get images for each category
const categoryData = categories
  .filter((category) => category !== "ALL")
  .map((category) => {
    // Find the first portfolio item for this category
    const portfolio = portfolios.find((item) => item.category === category);

    return {
      name: category,
      image: portfolio?.image || "/placeholder-image.jpg",
      link: `/portfolio?tab=${category.toUpperCase()}`,
    };
  });

const RelatedCategories = () => {
  return (
    <div className="flex flex-row md:flex-wrap gap-4 justify-between overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide md:overflow-visible">
      {categoryData.map((category, index) => (
        <motion.div
          key={category.name}
          className="relative group flex-shrink-0 snap-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ y: -5 }}
        >
          <Link
            href={category.link}
            className="block relative w-[246.21px] h-[207.63px] md:w-[200px] md:h-[200px]"
          >
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 768px) 207.63px, 200px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#00000080] !bg-opacity-20 hover:opacity-100 transition-opacity flex items-center justify-center">
                <h3 className="text-white text-[40.42px] md:text-xl font-bold">
                  {category.name}
                </h3>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default RelatedCategories;
